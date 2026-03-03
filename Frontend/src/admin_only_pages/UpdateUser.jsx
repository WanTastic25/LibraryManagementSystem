import { useEffect, useState } from "react"

function UpdateUser({ editUserId }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        role: ""
    });

    useEffect(() => {
        if (!editUserId) return

        fetch(`http://localhost:5009/api/User/${editUserId}`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [editUserId])

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5009/api/User/${editUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                alert("User updated!");
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="text"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="form-label">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="form-label">Roles:</label>
                        <select
                            className="form-control"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Librarian">Librarian</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>

                    <button className="btn btn-success mt-3" type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser