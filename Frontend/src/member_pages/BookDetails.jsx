import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "../css/BookDetails.css"

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
                console.log("HELLO");
                setBook(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBook();
    }, [bookId]);

    return (
        <div className="d-flex justify-content-center min-vh-100 align-items-center BookDetail">
            <div className="row border rounded shadow p-3 BookDetailCard">
                <div className="col-auto BookDetailImage border">
                    
                </div>
                <div className="col-auto BookDetailContent border p-3">
                    <div className="BookDetailTitle">
                        {book?.title};
                    </div>
                    <div className="BookDetailAuthor">
                        By {book?.author}
                    </div>
                    <div className="BookDetailSynopsis">

                    </div>
                    <div className="BookDetailButtons mt-3">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails