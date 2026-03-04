import React, { useState, useEffect } from "react"
import { data, Link } from "react-router-dom";
import "../css/BookCatalogue.css";

function BookCatalogue() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);

            try {
                const res = await fetch('http://localhost:5009/api/Book', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok)
                    throw new Error("No Response")

                const data = await res.json();
                setBooks(data);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    return (
        <div className="p-5 min-vh-100">
            <div className="row g-4">
                {books.map(book => (
                    <div className="col-2" key={book.bookId}>
                        <div className="card h-100">
                            <img className="card-image rounded" />
                            <div className="card-body d-flex flex-column">
                                <h5>{book.title}</h5>
                                <p>{book.author}</p>
                                <div className="card-button mt-auto">
                                    <button className="btn btn-primary me-2">Borrow</button>
                                    <Link className="btn btn-secondary" to={`/catalogue/book/${book.bookId}`}>
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookCatalogue