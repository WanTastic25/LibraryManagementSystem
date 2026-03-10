import { useEffect, useState } from "react"
import "../css/Cart.css"
import CheckoutModal from "./CheckoutModal";

function BorrowCart() {
    const [carts, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutModal, setCheckoutModal] = useState(false);

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
        fetch(`http://localhost:5009/api/Cart/item/${cartItemId}`, {
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

    function handleQuantityIncrease(cartItemId) {
        fetch(`http://localhost:5009/api/Cart/${cartItemId}/increase`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Increase failed");
                return res.json();
            })
            .then(() => {
                window.location.reload();
            })
            .catch(err => alert(err.message));
    }

    function handleQuantityDecrease(cartItemId) {
        fetch(`http://localhost:5009/api/Cart/${cartItemId}/decrease`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Decrease failed");
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
            <div className="row g-3 justify-content-center">
                {carts.map(cart => (
                    <div className="col-md-4 col-lg-3" key={cart.cartItemId}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`http://localhost:5009${cart.book.imageUrl}`}
                                className="card-img-top p-3"
                                alt={cart.book.title}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title">{cart.book.title}</h6>

                                <div className="d-flex align-items-center gap-2">

                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityDecrease(cart.cartItemId)}>
                                        -
                                    </button>

                                    <span className="fw-semibold">
                                        {cart.bookQuantity}
                                    </span>

                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityIncrease(cart.cartItemId)}>
                                        +
                                    </button>

                                </div>

                                <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => handleDelete(cart.cartItemId)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={() => setCheckoutModal(true)}>
                    Checkout
                </button>
                {checkoutModal && <CheckoutModal carts = {carts} onClose={() => setCheckoutModal(false)} />}
            </div>
        </div>
    )
}

export default BorrowCart