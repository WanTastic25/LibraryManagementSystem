import React, { useState, useEffect } from "react"

function BookList({ onEdit }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function FetchBook() {
        setLoading(true);

        fetch("http://localhost:5009/api/Book")
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

    useEffect(() => {
        FetchBook();
    }, []);

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <div className="tableTitle">
                <h1 className="basicText">Books In Db</h1>
            </div>
            <div className="tableContainer">
                <table className="table table-dark table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.bookId}>
                                <td>{book.bookId}</td>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        console.log(book.bookId)
                                        onEdit(book.bookId)
                                    }}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookList