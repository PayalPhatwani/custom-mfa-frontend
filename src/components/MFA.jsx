import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MFA(){
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        //const mfaToken = localStorage.getItem("mfaToken");
        const email = localStorage.getItem("email");
        console.log("otp in fe: ",otp)
        const res = await fetch("http://localhost:3000/auth/verify-mfa",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                email: email,     // user email
        code: otp, 
            }),
        });

        const data = await res.json();
        console.log("MFA Verification Response:", data);
        if(data.token.access_token){
            localStorage.setItem("token",data.token.access_token);
            localStorage.removeItem("mfaToken");
            navigate("/home");
        }else{
            console.log("invalid OTP from MFA class frontend")
            alert("Invalid OTP");
        }
    }

        return (
            <div>
                <h2>MFA Verification</h2>
                <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                ></input>
                <button onClick={handleVerify}>Verify</button>
            </div>
        );
    }
