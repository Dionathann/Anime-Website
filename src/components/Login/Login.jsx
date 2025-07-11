import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Header from "../Header/Header";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      const expiresAt = Date.now() + 60 * 60 * 1000;
      const name = response.data.user.userName;
      console.log(response);
      
      console.log(parseInt(expiresAt));
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", name);
      localStorage.setItem("expiresAt", expiresAt);

      alert(`Welcome ${name}!`);

      navigate("/");
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);

      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (

    <div className="page">
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        </div>
        
        <p className="register-link">
          Don`t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
