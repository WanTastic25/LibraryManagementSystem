import { useRef } from "react";
import { Navigate, Link } from "react-router-dom";

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const register = async (e) => {
        e.preventDefault();

        const registerData = {
            Email: emailRef.current.value,
            Password: passwordRef.current.value,
            Name: nameRef.current.value
        }

        const res = await fetch('http://localhost:5009/api/Auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData)
        });

        if (!res.ok)
            throw new Error(err);

        const data = await res.json();
        alert("Account Created!");
        Navigate("/login");
    }

    return (
        <div className="d-flex justify-content-center min-vh-100 align-items-center">
            <div>
                <h1>Become a Member today!</h1>
                <p>LMS provide special benefits and services to its members, so sign up today!</p>
            </div>
            <div className="tableCard border shadow p-5 m-5 rounded">
                <h1 className="mb-3">Register</h1>
                <form onSubmit={register} className="d-flex justify-content-center flex-column">
                    <label>Email:</label>
                    <input className="form-control" type="text" ref={emailRef} />

                    <label>Password:</label>
                    <input className="form-control" type="password" ref={passwordRef} />

                    <label>Name:</label>
                    <input className="form-control" type="name" ref={nameRef} />

                    <button className="btn btn-success mt-3" type="submit">Register</button>
                    <Link to={`/login`} className="mt-3">Return to login</Link>
                </form>
            </div>
        </div>
    )
}

export default Register