import { useRef } from "react";

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
    }

    return (
        <div className="tableCard d-flex justify-content-center flex-column border shadow p-5 m-5">
            <form onSubmit={register} className="d-flex justify-content-center flex-column">
                <label htmlFor="">Email:</label>
                <input type="text" ref={emailRef} />

                <label htmlFor="">Password:</label>
                <input type="password" ref={passwordRef} />

                <label htmlFor="">Name:</label>
                <input type="name" ref={nameRef} />

                <button className="btn btn-primary mt-3" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register