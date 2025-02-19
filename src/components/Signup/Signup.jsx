import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Header from "../Header/Header";

function Signup(){
    const [userName, setUserName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try{
            await axios.post("http://localhost:5000/auth/signup", {userName, email, password});
            alert("Signup successful! Redirecting to login...");
            navigate("/login");
        }
        catch(error){
          console.error("❌ Signup failed:", error.response?.data || error.message);
          setError(error.response?.data?.error || "Something went wrong");
        }
    };


  return (

    <>
      <Header />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}


export default Signup