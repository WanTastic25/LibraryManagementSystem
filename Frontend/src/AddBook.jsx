import { useRef } from "react";

function AddBook() {
    const isbnRef = useRef();
    const titleRef = useRef();
    const authorRef = useRef();
    const copyRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const bookData = {
            ISBN: isbnRef.current.value,
            Title: titleRef.current.value,
            Author: authorRef.current.value,
            Copies: Number(copyRef.current.value)
        }

        try {
            const response = await fetch("http://localhost:5009/api/Book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) throw new Error("Failed to add book");

            const data = await response.json();
            alert("Book added successfully!");

        } catch (err) {
            console.log("Error occured: " + err);
        }
    }

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">ISBN:</label>
                    <input className="form-control" type="text" ref={isbnRef} placeholder="ISBN" required />
                </div>

                <div>
                    <label className="form-label">Title:</label>
                    <input className="form-control" type="text" ref={titleRef} placeholder="Title" required />
                </div>

                <div>
                    <label className="form-label">Author:</label>
                    <input className="form-control" type="text" ref={authorRef} placeholder="Author name" required />
                </div>

                <div>
                    <label className="form-label">Copies:</label>
                    <input className="form-control" type="number" ref={copyRef} placeholder="0" required />
                </div>

                <button className="btn btn-success mt-3" type="submit">Add Book</button>
                <button className="btn btn-danger ms-2 mt-3" type="reset">Reset</button>
            </form>
        </div>
    )
}

export default AddBook