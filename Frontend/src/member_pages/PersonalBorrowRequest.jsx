import { useEffect, useState } from "react"

function PersonalBorrowRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:5009/api/BorrowRequest/your-requests", {
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

        fetchRequest();
    }, [])

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
        return <p>No Borrow Requests Made.</p>;
    }

    return (
        <div className="p-5 min-vh-100">
            <div className="row g-4">
                {requests.map(request => (
                    <div className="col-md-3 col-sm-6" key={request.requestId}>
                        <div className="card p-1 h-100">
                            <img className="card-image rounded" src={`http://localhost:5009${request.book?.imageUrl}`} alt={request.book?.title} />
                            <div className="card-body d-flex flex-column">
                                <h6 className="fw-bold">{request.book?.title}</h6>
                                <p className="text-muted small mb-2">
                                    {request.book?.author}
                                </p>
                                <p className="small mb-2">
                                    Quantity: <strong>{request.bookQuantity}</strong>
                                </p>
                                <p className="small mb-2">
                                    Pickup: <strong>{request.pickupDate}</strong>
                                </p>
                                <p className="small mb-2">
                                    Return: <strong>{request.returnDate}</strong>
                                </p>
                                <div className="mt-auto">
                                    <span className={`badge ${getStatusClass(request.status)} px-3 py-2`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PersonalBorrowRequest