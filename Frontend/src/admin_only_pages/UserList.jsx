import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserList({ onEdit }) {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        function fetchUser() {
            setLoading(true);

            fetch('http://localhost:5009/api/User', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
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
                })
        }

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 fw-semibold">Users In Database</h3>

                    <Link className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                        to="/user-list/add-user">
                        + Add User
                    </Link>
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>User ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="text-muted small">{user.id}</td>
                                    <td className="">{user.email}</td>
                                    <td className="">{user.name}</td>
                                    <td className="fw-semibold">{user.role}</td>
                                    <td className="text-center">
                                        <Link
                                            className="btn btn-outline-primary btn-sm"
                                            to={`/user-list/user/${user.id}`}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList