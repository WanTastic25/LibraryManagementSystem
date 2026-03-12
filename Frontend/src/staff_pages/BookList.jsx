import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function BookList({ onEdit }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        function fetchBook() {
            setLoading(true);

            fetch("http://localhost:5009/api/Book", {
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
                    setBooks(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }

        fetchBook();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 fw-semibold">Books In Database</h3>

                    <Link className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                        to="/book-list/add-book">
                        + Add Book
                    </Link>
                </div>

                <div className="card-body p-0">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Book ID</th>
                                <th>ISBN</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map(book => (
                                <tr key={book.bookId}>
                                    <td className="text-muted small">{book.bookId}</td>
                                    <td className="">{book.isbn}</td>
                                    <td className="fw-semibold">{book.title}</td>
                                    <td className="">{book.author}</td>
                                    <td className="text-center">
                                        <Link
                                            className="btn btn-outline-primary btn-sm"
                                            to={`/book-list/book/${book.bookId}`}
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

export default BookList