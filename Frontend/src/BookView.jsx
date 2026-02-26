import { useEffect, useState } from "react"

function BookView({ bookId }) {
    const [book, setBook] = useState(null)
    
    useEffect(() => {
        if (!bookId) return;

        const fetchBook = async () => {
            try {
                const res = await fetch(`http://localhost:5009/api/Book/${bookId}`);
                if (!res.ok) throw new Error("Id not found");

                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBook();
    }, [bookId]);

    return (
        <div>
            <div>
                <label>ISBN</label>
                <p>{book?.isbn}</p>
                <label>Title</label>
                <p>{book?.title}</p>
                <label>Author</label>
                <p>{book?.author}</p>
                <label>Copies Available</label>
                <p>{book?.copies}</p>
            </div>
        </div>
    )
}

export default BookView