import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutModal({ onClose, carts }) {
    const pickUpDateRef = useRef();
    const returnDateRef = useRef();
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();

        var cartId = null

        try {
            for (const cart of carts) {
                const payload = {
                    bookId: cart.book.bookId,
                    bookQuantity: cart.bookQuantity,
                    userId: cart.userId,
                    status: "Pending",
                    ReturnDate: returnDateRef.current.value,
                    PickupDate: pickUpDateRef.current.value
                }

                cartId = cart.cartId;

                const res = await fetch("http://localhost:5009/api/BorrowRequest", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

                if (!res.ok) throw new Error("Failed to make request");
            }

            alert("Request made successfully!");

            const res = await fetch(`http://localhost:5009/api/Cart/${cartId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                }
            })

            if (!res.ok) throw new Error("Failed to empty cart");

            navigate("/catalogue");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Checkout</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Pick-up Date</label>
                            <input ref={pickUpDateRef} type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Return Date</label>
                            <input ref={returnDateRef} type="date" className="form-control" />
                        </div>
                        <button
                            className="btn btn-success"
                            onClick={handleCheckout}
                        > Finish Checkout </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal