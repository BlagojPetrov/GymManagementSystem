import "./index.css";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Member from "./Pages/Member/Member";
import GeneralUser from "./Pages/GeneralUser/GeneralUser";
import MemberDetail from "./Pages/MemberDetail/MemberDetail";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin") === "true";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member" element={<Member />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </div>
  );
}

export default App;
