import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

function BorrowAndOverdue() {
    const [memberCount, setMemberCount] = useState(0);
    const [bookCount, setBookCount] = useState(0);
    const [pickedUpBookCount, setPickedUpBookCount] = useState(0);
    const [overdueBookCount, setOverdueBookCount] = useState(0);

    useEffect(() => {
        fetchUser();
        fetchBook();
        fetchPickedUpBook();
        fetchOverdueBook();
    }, []);

    const fetchUser = async () => {
        const res = await fetch('http://localhost:5009/api/User/user-count', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        const data = await res.json();
        setMemberCount(data);
    };

    const fetchBook = async () => {
        const res = await fetch('http://localhost:5009/api/Book/book-count', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        const data = await res.json();
        setBookCount(data);
    };

    const fetchPickedUpBook = async () => {
        const res = await fetch('http://localhost:5009/api/BorrowRequest/borrow-count', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        const data = await res.json();
        setPickedUpBookCount(data);
    };

    const fetchOverdueBook = async () => {
        const res = await fetch('http://localhost:5009/api/BorrowRequest/overdue-book-count', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        const data = await res.json();
        setOverdueBookCount(data);
    };

    const chartData = [
        { month: 'Jan', borrowed: 40, overdue: 5 },
        { month: 'Feb', borrowed: 55, overdue: 8 },
        { month: 'Mar', borrowed: 70, overdue: 10 },
        { month: 'Apr', borrowed: 65, overdue: 7 },
        { month: 'May', borrowed: 80, overdue: 12 },
    ];

    return (
        <div className="container mt-5 min-vh-100">

            {/* Top cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card-dashboard p-3 text-center shadow-sm rounded-4">
                        <h1>{memberCount}</h1>
                        <p>Members</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-dashboard p-3 text-center shadow-sm rounded-4">
                        <h1>{bookCount}</h1>
                        <p>Books</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-dashboard p-3 text-center shadow-sm rounded-4">
                        <h1>{pickedUpBookCount}</h1>
                        <p>Borrowed</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card-dashboard p-3 text-center shadow-sm rounded-4">
                        <h1>{overdueBookCount}</h1>
                        <p>Overdue</p>
                    </div>
                </div>
            </div>

            {/* Two charts */}
            <div className="row g-4 mb-4">

                <div className="col-md-6">
                    <div className="card p-3 shadow-sm rounded-4">
                        <h5>Borrow Trend</h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="borrowed" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card p-3 shadow-sm rounded-4">
                        <h5>Overdue Trend</h5>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="overdue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Comparison chart */}
            <div className="row">
                <div className="col">
                    <div className="card p-3 shadow-sm rounded-4">
                        <h5>Borrow vs Overdue</h5>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="borrowed" fill="#82ca9d" barSize={25} />
                                <Bar dataKey="overdue" fill="#d22e2e" barSize={25} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BorrowAndOverdue;