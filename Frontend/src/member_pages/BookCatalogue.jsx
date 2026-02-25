import React, { useState, useEffect } from "react"

function BookCatalogue({ onViewMore }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async (e) => {
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5009/api/Book')

            if (!res.ok)
                throw new Error("No Response")

            const data = await res.json();
            setBooks(data);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="container-fluid p-5 min-vh-100 align-content-center border">
            <div className="row g-2">
                {books.map(book => (
                    <div className="col" key={book.bookId}>
                        <div className="card">
                            <div className="card-body">
                                <p>{book.title}</p>
                                <p>{book.author}</p>
                                <button className="btn btn-primary">Borrow</button>
                                <button className="btn btn-secondary" onClick={() => {
                                    console.log("Sending ID:", book.bookId);
                                    onViewMore(book.bookId)
                                }}>
                                    More..
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookCatalogue