import { Alert } from "bootstrap";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./css/Login.css";
import logo from './assets/Screenshot 2026-03-03 212236.png';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginCheck = async (e) => {
        e.preventDefault();

        const loginData = {
            Email: emailRef.current.value,
            Password: passwordRef.current.value
        }

        const res = await fetch(`http://localhost:5009/api/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        if (!res.ok) {
            alert("Invalid Credentials");
            setEmail("");
            setPassword("");
            throw new Error("Login Failed");
        }

        const data = await res.json();
        const token = data.token;
        sessionStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role == "Member") {
            window.location.href = "/catalogue";
        }
        else if (role === "Admin" || role === "Librarian") {
            window.location.href = "/book-list"
        }
        else {
            alert("Invalid Credentials");
            throw new Error("Login Failed");
        }
    }

    return (
        <div className="d-flex justify-content-center min-vh-100 align-items-center">
            <img className="m-5" src={logo} />
            <div className="tableCard border shadow p-5 rounded">
                <h1 className="mb-3">Login</h1>
                <form onSubmit={loginCheck} className="d-flex flex-column">
                    <label>Email:</label>
                    <input className="form-control" type="text" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Password:</label>
                    <input className="form-control" type="password" ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button className="btn btn-success mt-3" type="submit">Login</button>
                    <Link to={`/register`} className="mt-3">
                        No account? Register here
                    </Link>
                    <Link className="mt-3">
                        Forgot Password?
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login