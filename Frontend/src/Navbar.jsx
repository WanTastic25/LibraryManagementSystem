import { Link } from "react-router-dom";
import "./css/Navbar.css"

function Navbar({ role }) {
    if (!role) return null;

    return (
        <nav className="navbar navbar-expand-lg sticky-top green-navbar">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link text-white" to="/">Logout</Link></li>
                {(role === "Admin" || role === "Librarian") && (
                    <>
                        <li className="nav-item"><Link className="nav-link text-white" to="/book-list">Books List</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/borrow-list">Borrow List</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
                    </>
                )}

                {(role === "Admin") && (
                    <>
                        <li className="nav-item"><Link className="nav-link text-white" to="/user-list">Users List</Link></li>
                    </>
                )}

                {role === "Member" && (
                    <>
                        <li className="nav-item"><Link className="nav-link text-white" to="/cart">My Cart</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/catalogue">Catalogue</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/requests">Requests</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar