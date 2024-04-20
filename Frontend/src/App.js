import "./index.css";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/user/HomePage";
import Login from "./pages/user/Login";
import Navbar from "./components/Navbar";
import AddTransaction from "./pages/user/AddTransaction";
import Transactions from "./pages/user/Transactions";
import Categories from "./pages/user/Categories";

function App() {
  return (
    <div className="">
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <div className="py-2"></div>
                  <Outlet />
                </>
              }>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
