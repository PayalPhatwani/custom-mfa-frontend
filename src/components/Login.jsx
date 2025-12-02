import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    console.log("Login Data:", loginData);
    // axios.post('/login', loginData)
    try {
      const res = await fetch("http://localhost:3000/auth/login",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(loginData),
      })

      const body = await res.json()

      if(res.ok){
        console.log("loging successfull", body);
        // redirecting to home page
        navigate("/home");
      }else{
        alert(body.message || "Login Failed");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
         <p>
  Don't have an account?{" "}
  <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
    Create Account
  </Link>
</p>
      </form>
    </div>
  );
}

// Basic CSS-in-JS styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  form: {
    width: "320px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
