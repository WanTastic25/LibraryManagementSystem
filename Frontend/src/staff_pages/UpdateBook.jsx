import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UpdateBook() {
    const { bookId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [book, setBook] = useState({
        isbn: "",
        title: "",
        author: "",
        copies: "",
        synopsis: "",
        imageUrl: "",
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

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ISBN", book.isbn);
        formData.append("Title", book.title);
        formData.append("Author", book.author);
        formData.append("Synopsis", book.synopsis);
        formData.append("Copies", Number(book.copies));
        if (imageFile) formData.append("Image", imageFile);

        fetch(`http://localhost:5009/api/Book/${bookId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: formData,
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Update failed");
                }
                return res.json();
            })
            .then(() => {
                alert("Book updated!");
                window.location.reload();
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <h2>Update Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                    <label className="form-label">Current Image</label>
                    <img className="mb-3" width={300} src={`http://localhost:5009${book.imageUrl}`} alt="current image" />
                </div>

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
                    <label className="form-label" >Synopsis</label>
                    <textarea
                        className="form-control"
                        type="text"
                        name="synopsis"
                        rows={4}
                        value={book.synopsis}
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

                <div>
                    <label className="form-label" >New Image</label>
                    <input
                        className="form-control"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>

                <button className="btn btn-success mt-3 me-2" type="submit">Update</button>
                <Link className="btn btn-secondary mt-3" to={"/book-list"}>
                    Back
                </Link>
            </form>
        </div>
    )
}

export default UpdateBook;