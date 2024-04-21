import "./index.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/user/HomePage";
import Login from "./pages/user/Login";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [index, setIndex] = useState(0);
  return (
    <div className="">
      <Router>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <>
                  <Navbar index={index} setIndex={setIndex} />
                  <Outlet />
                </>
              }>
              <Route path="/" element={<HomePage index={index} />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
