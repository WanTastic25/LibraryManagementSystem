import { useEffect, useState } from "react"
import "../css/Cart.css"

function BorrowCart() {
    const [carts, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:5009/api/Cart", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!res.ok) {
                    throw new Error("No Response")
                }

                const data = await res.json();
                setCart(data);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchCart();
    }, [])

    function handleDelete(cartItemId) {
        fetch(`http://localhost:5009/api/Cart/${cartItemId}`, {
            method: "DELETE",
            headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    }
        })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                alert("Delete Success");
                return res.json();
            })
            .then(() => {
                window.location.reload();
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-5 min-vh-100">
            <div className="row g-2 d-flex justify-content-center">
                {carts.map(cart => (
                    <div className="col-3 border d-flex flex-block me-2" key={cart.cartItemId}>
                        <div className="col-auto">
                            <div className="cart-imageBox">
                                <img className="cart-image" src={`http://localhost:5009${cart.book.imageUrl}`} alt={cart.book.title} />
                            </div>
                        </div>
                        <div className="col-auto d-flex align-items-center ms-2">
                            <div className="cart-body">
                                <h6>{cart.book.title}</h6>
                                {cart.bookQuantity}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(cart.cartItemId)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-primary mt-2">Check</button>
            </div>
        </div>
    )
}

export default BorrowCart