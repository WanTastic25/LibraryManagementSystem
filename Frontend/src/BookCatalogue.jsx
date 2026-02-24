import React, { useState, useEffect } from "react"

function BookCatalogue() {
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
            <div className="row g-4">
                <div className="col-md-12">
                    {books.map(book => (
                        <div className="card" key={book.id}>
                            <div className="card-body">
                                <p>{book.title}</p>
                                <p>Test</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookCatalogue