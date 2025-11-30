import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Registration Data:", formData);

    // API call example:
    // axios.post('/register', formData)
    const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const body = await res.json();
  if (res.ok) {
    console.log('Registered:', body);
  } else {
    console.error('Error:', body);
  }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

// same styling as login page
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  form: {
    width: "350px",
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
