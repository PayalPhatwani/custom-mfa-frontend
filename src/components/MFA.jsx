import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export default function MFA() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next box automatically
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join(""); // create single string like "123456"
    const email = localStorage.getItem("email");

    const res = await fetch(`${API_URL}/auth/verify-mfa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        code: finalOtp,
      }),
    });

    const data = await res.json();
    console.log("MFA Verification Response:", data);

    if (data.token?.access_token) {
      localStorage.setItem("token", data.token.access_token);
      localStorage.removeItem("mfaToken");
      navigate("/home");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MFA Verification</h2>

        <div style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              style={styles.input}
              inputMode="numeric"
            />
          ))}
        </div>

        <button onClick={handleVerify} style={styles.button}>Verify</button>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f3f5",
  },
  card: {
    background: "white",
    padding: "40px 30px",
    borderRadius: "16px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: 600,
  },
  otpContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    width: "45px",
    height: "55px",
    fontSize: "24px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    background: "#f8f9fa",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4c6ef5",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
