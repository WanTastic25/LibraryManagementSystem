import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { Line, LineChart } from 'recharts';
import '../../css/BorrowAndReturn.css';

function BorrowAndReturn() {
    const [memberCount, setMemberCount] = useState(0);
    const [bookCount, setBookCount] = useState(0);
    const [pickedUpBookCount, setPickedUpBookCount] = useState(0);
    const [overdueBookCount, setOverdueBookCount] = useState(0);

    const fetchUser = async () => {
        try {
            const res = await fetch('http://localhost:5009/api/User/user-count');

            if (!res.ok)
                throw new Error("Fetch User Failed");

            const data = await res.json();
            setMemberCount(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchBook = async () => {
        try {
            const res = await fetch('http://localhost:5009/api/Book/book-count', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!res.ok)
                throw new Error("Fetch Book Failed");

            const data = await res.json();
            setBookCount(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchPickedUpBook = async () => {
        try {
            const res = await fetch('http://localhost:5009/api/BorrowRequest/borrow-count', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!res.ok)
                throw new Error("Fetch Book Failed");

            const data = await res.json();
            setPickedUpBookCount(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchOverdueBook = async () => {
        try {
            const res = await fetch('http://localhost:5009/api/BorrowRequest/overdue-book-count', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!res.ok)
                throw new Error("Fetch Book Failed");

            const data = await res.json();
            setOverdueBookCount(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchBook();
        fetchPickedUpBook();
        fetchOverdueBook();
    }, [])

    const data = [
        {
            name: 'Page A',
            uv: 400,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 300,
            pv: 4567,
            amt: 2400,
        },
        {
            name: 'Page C',
            uv: 320,
            pv: 1398,
            amt: 2400,
        },
        {
            name: 'Page D',
            uv: 200,
            pv: 9800,
            amt: 2400,
        },
        {
            name: 'Page E',
            uv: 278,
            pv: 3908,
            amt: 2400,
        },
        {
            name: 'Page F',
            uv: 189,
            pv: 4800,
            amt: 2400,
        },
    ];

    return (
        <div className="container mt-5 min-vh-100">
            <div className="row">
                <div className="col">
                    <div className="card shadow-sm border rounded-4 p-3 justify-content-center align-items-center">
                        <h1>{memberCount}</h1>
                        <p>Number of Members</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border rounded-4 p-3 justify-content-center align-items-center">
                        <h1>{bookCount}</h1>
                        <p>Number of Books</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border rounded-4 p-3 justify-content-center align-items-center">
                        <h1>{pickedUpBookCount}</h1>
                        <p>Number of Picked Up Books</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm border rounded-4 p-3 justify-content-center align-items-center overdue-card">
                        <h1>{overdueBookCount}</h1>
                        <p>Number of Overdue Books</p>
                    </div>
                </div>

                <div className="row">
                    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                        <Line dataKey="uv" />
                        <RechartsDevtools />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

export default BorrowAndReturn