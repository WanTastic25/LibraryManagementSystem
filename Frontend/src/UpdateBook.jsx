import { useEffect, useState } from "react";

function UpdateBook({ editBookId }) {
    const [bookId, setId] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [book, setBook] = useState({
        isbn: "",
        title: "",
        author: "",
        copies: ""
    });

    useEffect(() => {
        if (!editBookId)
            return

        fetch(`http://localhost:5009/api/Book/${editBookId}`)
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
    }, [editBookId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setHero(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5009/api/Book/${editBookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                alert("Hero updated!");
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label basicText">ISBN</label>
                    <input
                        className="form-control"
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label basicText">Author</label>
                    <input
                        className="form-control"
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label basicText">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="form-label basicText" >Copies</label>
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