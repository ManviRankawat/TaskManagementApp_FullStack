import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom"; // To redirect after login/signup
import axios from "axios";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignup: React.FC = () => {
    const [action, setAction] = useState("Sign Up"); // Default to Sign Up
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate(); // Hook to navigate to home after login/signup

    // Handle input changes
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Handle submit action for Signup/Login
    const submit = async () => {
        if (data.email === "" || data.password === "" || (action === "Sign Up" && data.username === "")) {
            alert("All fields are required");
            return;
        }
    
        try {
            const response = await fetch(
                action === "Sign Up" ? "http://localhost:1000/api/v1/sign-in" : "http://localhost:1000/api/v1/log-in",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
    
            // Read response as text first
            const result = await response.text();
            console.log(" Server Response:", result); 
    
            try {
                // Try parsing as JSON
                const jsonResponse = JSON.parse(result);
                console.log("Parsed JSON Response:", jsonResponse);
    
                if (response.ok) {
                    console.log(jsonResponse); 
                    if (action === "Sign Up") {
                        setAction("Login"); 
                    } else {
                        localStorage.setItem("id", jsonResponse.id);
                        localStorage.setItem("token", jsonResponse.token);

                        console.log("Stored ID:", jsonResponse.id);
                        console.log("Stored Token:", jsonResponse.token);

                        navigate("/allTasks");
                    }
                } else {
                    alert(jsonResponse.message || "Something went wrong");
                }
            } catch (parseError) {
                console.error("Response is not valid JSON:", result);
                alert("Unexpected response from the server.");
            }
        } catch (error) {
            console.error(` ${action} Error:`, error);
            alert("Server error. Try again later.");
        }
    };
    

    return (
        <div className="container">
            <div className="header">
                <h1 className="bold-text">Task Management App</h1>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            value={data.username}
                            onChange={change}
                        />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={data.email}
                        required
                        onChange={change}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={change}
                    />
                </div>
            </div>

            {action === "Login" ? (
                <>
                    <div className="forgot-password">
                        Forgot Password? <span>Click Here!</span>
                    </div>
                    <div className="not-account">
                        Not having an Account?{" "}
                        <span onClick={() => setAction("Sign Up")} className="signup-link bold">
                            Signup here
                        </span>
                    </div>
                </>
            ) : (
                <div className="already-account">
                    Already have an account?{" "}
                    <span onClick={() => setAction("Login")} className="login-link bold">
                        Login here
                    </span>
                </div>
            )}

            <div className="submit-container">
                <button className="submit" onClick={submit}>
                    {action}
                </button>
            </div>
        </div>
    );
};

export default LoginSignup;
