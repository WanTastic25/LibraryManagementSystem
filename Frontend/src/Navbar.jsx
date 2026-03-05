import { Link } from "react-router-dom";
import "./css/Navbar.css"

function Navbar({ role }) {
    if (!role) return null;

    return (
        <nav className="navbar navbar-expand-lg sticky-top green-navbar">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link text-white" to="/">Logout</Link></li>
                {role === "Admin" && (
                    <>
                        <li className="nav-item"><Link className="nav-link text-white" to="#">Users List</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/book-list">Books List</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/add-book">Add Books</Link></li>
                    </>
                )}

                {role === "Member" && (
                    <>
                        <li className="nav-item"><Link className="nav-link text-white" to="#">My Cart</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar