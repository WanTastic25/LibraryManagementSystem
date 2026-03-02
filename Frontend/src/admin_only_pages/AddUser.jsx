import { useRef } from "react";

function AddUser() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const roleRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            role: roleRef.current.value,
        }

        try {
            const response = await fetch("http://localhost:5009/api/User", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error("Failed to add user");

            const data = await response.json();
            alert("User added successfully!");

        } catch (err) {
            console.log("Error occured: " + err);
        }
    }

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Email:</label>
                    <input className="form-control" type="text" ref={emailRef} placeholder="Email" required />
                </div>

                <div>
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="text" ref={passwordRef} placeholder="Password" required />
                </div>

                <div>
                    <label className="form-label">Name:</label>
                    <input className="form-control" type="text" ref={nameRef} placeholder="Name" required />
                </div>

                <div>
                    <label className="form-label">Roles:</label>
                    <select className="form-control" required>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Librarian">Librarian</option>
                        <option value="Member">Member</option>
                    </select>
                </div>

                <button className="btn btn-success mt-3" type="submit">Add Book</button>
                <button className="btn btn-danger ms-2 mt-3" type="reset">Reset</button>
            </form>
        </div>
    )
}

export default AddUser