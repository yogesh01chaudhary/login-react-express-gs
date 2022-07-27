import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/auth/LoginReg";
import SendPasswordResetEmail from "./components/pages/auth/SendPasswordResetEmail";
import Dashboard from "./components/pages/auth/Dashboard";
import ResetPassword from "./components/pages/auth/ResetPassword";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Error 404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
