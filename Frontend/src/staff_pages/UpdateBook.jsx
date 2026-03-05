import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateBook() {
    const { bookId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [book, setBook] = useState({
        isbn: "",
        title: "",
        author: "",
        copies: ""
    });

    useEffect(() => {
        if (!bookId) {
            alert("Error: No book selected to edit!");
            return;
        }

        fetch(`http://localhost:5009/api/Book/${bookId}`, {
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
                setBook(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [bookId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5009/api/Book/${bookId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                alert("Book updated!");
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">ISBN</label>
                    <input
                        className="form-control"
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label">Author</label>
                    <input
                        className="form-control"
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label" >Copies</label>
                    <input
                        className="form-control"
                        type="number"
                        name="copies"
                        value={book.copies}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-success mt-3" type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateBook;