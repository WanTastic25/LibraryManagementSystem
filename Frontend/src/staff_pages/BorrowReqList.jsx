import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BorrowReqList() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequest = async () => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5009/api/BorrowRequest?status=Pending", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok)
                throw new Error("No Response")

            const data = await res.json();
            setRequests(data);
            setLoading(false);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    async function handleApprove(requestId) {
        try {
            const res = await fetch(`http://localhost:5009/api/BorrowRequest/${requestId}/approve`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error("Approve failed");
            }

            fetchRequest();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleReject(requestId) {
        try {
            const res = await fetch(`http://localhost:5009/api/BorrowRequest/${requestId}/reject`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error("Reject failed");
            }

            fetchRequest();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handlePickup(requestId) {
        try {
            const res = await fetch(`http://localhost:5009/api/BorrowRequest/${requestId}/pick-up`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error("Pick Up failed");
            }

            fetchRequest();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(requestId) {
        try {
            const res = await fetch(`http://localhost:5009/api/BorrowRequest/${requestId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            alert("Request deleted");

            fetchRequest();

        } catch (error) {
            console.error(error);
            alert("Error deleting request");
        }
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-warning text-dark";
            case "Approved":
                return "bg-success";
            case "Rejected":
                return "bg-danger";
            case "Overdue":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (requests.length === 0) {
        return <p>No Borrow Requests.</p>;
    }

    return (
        <div className="container mt-5 p-2 min-vh-100">
            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-white border-0">
                    <h3 className="fw-semibold">Book Requests</h3>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Quantity</th>
                                <th>Pickup Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map(request => (
                                <tr key={request.requestId}>
                                    <td>
                                        <img
                                            src={`http://localhost:5009${request.book?.imageUrl}`}
                                            alt={request.book?.title}
                                            width="50"
                                            className="rounded"
                                        />
                                    </td>

                                    <td className="fw-semibold">
                                        {request.book?.title}
                                    </td>

                                    <td className="text-muted">
                                        {request.book?.author}
                                    </td>

                                    <td className="text-muted">
                                        {request.userId}
                                    </td>

                                    <td>
                                        {request.user.name}
                                    </td>

                                    <td>
                                        <strong>{request.bookQuantity}</strong>
                                    </td>

                                    <td>
                                        {request.pickupDate}
                                    </td>

                                    <td>
                                        {request.returnDate}
                                    </td>

                                    <td>
                                        <span className={`badge ${getStatusClass(request.status)} px-3 py-2`}>
                                            {request.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="d-flex flex-column gap-2">
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => handleApprove(request.requestId)}
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleReject(request.requestId)}
                                            >
                                                Reject
                                            </button>

                                            <button
                                                className="btn btn-outline-warning btn-sm"
                                                onClick={() => handlePickup(request.requestId)}
                                            >
                                                Picked Up
                                            </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(request.requestId)}
                                            >
                                                Delete
                                            </button>
                                        </div>
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

export default BorrowReqList