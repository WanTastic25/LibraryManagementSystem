import { useRef } from "react";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

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

        if (!res.ok)
            throw new Error("Login Failed");

        const data = await res.json();
        alert("Welcome!");
    }

    return (
        <div className="tableCard d-flex justify-content-center flex-column border shadow p-5 m-5">
            <form onSubmit={loginCheck} className="d-flex justify-content-center flex-column">
                <label>Email:</label>
                <input type="text" ref={emailRef} />

                <label>Password:</label>
                <input type="password" ref={passwordRef} />

                <button className="btn btn-primary mt-3" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login