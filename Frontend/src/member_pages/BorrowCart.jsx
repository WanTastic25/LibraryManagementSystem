import { useEffect, useState } from "react"

function BorrowCart() {
    const [cart, setCart] = useState([]);
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

            } catch {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchCart();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <p>{cart?.bookId}</p>
            
        </div>
    )
}

export default BorrowCart