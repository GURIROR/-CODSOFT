import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await axios.post(url, formData);

      localStorage.setItem("token", res.data.token);
      alert(`✅ ${isLogin ? "Logged In" : "Signed Up"} Successfully!`);
      window.location.href = "/";
    } catch (error) {
      alert(`❌ ${error.response.data.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Auth;
