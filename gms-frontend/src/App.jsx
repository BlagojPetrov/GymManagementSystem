import "./index.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Member from "./Pages/Member/Member";
import GeneralUser from "./Pages/GeneralUser/GeneralUser";
import MemberDetail from "./Pages/MemberDetail/MemberDetail";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLogin") === "true";
    setIsLogin(isLoggedIn);
  }, []);

  // Dokolku se dodavaat drugi strani, treba da se stavat vo sidebarRoutes!!!
  const sidebarRoutes = ["/dashboard", "/member", "/specific"];
  const showSidebar =
    isLogin && sidebarRoutes.some((path) => location.pathname.startsWith(path));

  if (isLogin === null) return null;

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/member"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Member />
            </PrivateRoute>
          }
        />
        <Route
          path="/member/:id"
          element={
            <PrivateRoute isLogin={isLogin}>
              <MemberDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/specific/:type"
          element={
            <PrivateRoute isLogin={isLogin}>
              <GeneralUser />
            </PrivateRoute>
          }
        />

        {/* Други приватни рути исто така */}
      </Routes>
    </div>
  );
}

export default App;
