import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function BookDetails() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null)

    useEffect(() => {
        if (!bookId) return;

        const fetchBook = async () => {
            try {
                const res = await fetch(`http://localhost:5009/api/Book/${bookId}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
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

export default BookDetails