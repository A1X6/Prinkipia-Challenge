import "./App.css";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/jobs";
import Login from "./pages/login/Login";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import Users from "./pages/users/Users";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="jobs"
            element={
              <RequireAuth>
                <Jobs />
              </RequireAuth>
            }
          />
          <Route
            path="users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
