import { useEffect } from "react"

function BorrowButton({ bookId }) {

    const handleAddToCart = async () => {
        try {
            const res = await fetch("http://localhost:5009/api/Cart", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookId: bookId,
                    quantity: 1
                })
            });

            if (!res.ok) {
                const error = await res.text();
                alert("Error borrow book: " + error);
                return;
            }

        } catch {
            console.error(err);
            alert("borrow book failed");
        }
    };


    return (
        <div>
            <button className="btn btn-primary me-2" onClick={handleAddToCart}>
                Borrow
            </button>
        </div>
    )
}

export default BorrowButton