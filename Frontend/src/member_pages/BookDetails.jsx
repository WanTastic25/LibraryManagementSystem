import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "../css/BookDetails.css"
import BorrowButton from "./BorrowButton";

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
        <div className="d-flex justify-content-center align-items-center min-vh-100 BookDetail">
            <div className="row BookDetailCard shadow-lg rounded-4 p-4">
                <div className="col-md-5 d-flex justify-content-center align-items-center BookDetailImage">
                    <img
                        src={`http://localhost:5009${book?.imageUrl}`}
                        alt={book?.title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-7 BookDetailContent ps-4">
                    <h2 className="BookDetailTitle">
                        {book?.title}
                    </h2>
                    <p className="BookDetailAuthor text-muted mb-3">
                        By {book?.author}
                    </p>

                    <hr />

                    <p className="BookDetailSynopsis">
                        {book?.synopsis}
                    </p>
                    <div className="mt-4">
                        <BorrowButton bookId={book?.bookId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails