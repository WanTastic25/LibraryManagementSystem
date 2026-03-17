import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import Login from './Login.jsx'
import BookCatalogue from './member_pages/BookCatalogue.jsx'
import Register from './member_pages/Register.jsx'
import UpdateBook from './staff_pages/UpdateBook.jsx'
import BookDetails from './member_pages/BookDetails.jsx'
import BookList from './staff_pages/BookList.jsx'
import AddBook from './staff_pages/AddBook.jsx'
import AddUser from './admin_only_pages/AddUser.jsx'
import UserList from './admin_only_pages/UserList.jsx'
import UpdateUser from './admin_only_pages/UpdateUser.jsx'
import PrivateRoute from "./private_route.jsx";
import Navbar from "./Navbar.jsx";
import BorrowButton from "./member_pages/BorrowButton.jsx";
import BorrowCart from "./member_pages/BorrowCart.jsx";
import PersonalBorrowRequest from "./member_pages/PersonalBorrowRequest.jsx";
import BorrowReqList from "./staff_pages/BorrowReqList.jsx";
import BorrowAndOverdue from "./staff_pages/Dashboards/BorrowAndOverdue.jsx";

function App() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const roleClaim = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            setRole(roleClaim);
        }
    }, []);

    function AppContent() {
        const location = useLocation();

        const hideNavbar =
            location.pathname === "/login" ||
            location.pathname === "/register";

        return (
            <>
                {!hideNavbar && <Navbar role={role} />}
            </>
        );
    }

    return (
        <Router>
            <AppContent />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<PrivateRoute requiredRole="Member" />}>
                    <Route path="/catalogue" element={<BookCatalogue />} />
                    <Route path="/catalogue/book/:bookId" element={<BookDetails />} />
                    <Route path="/cart" element={<BorrowCart />} />
                    <Route path="/requests" element={<PersonalBorrowRequest />} />
                </Route>

                <Route element={<PrivateRoute requiredRole={["Admin", "Librarian"]} />}>
                    <Route path="/book-list" element={<BookList />} />
                    <Route path="/book-list/book/:bookId" element={<UpdateBook />} />
                    <Route path="/book-list/add-book" element={<AddBook />} />
                    <Route path="/borrow-list" element={<BorrowReqList />} />
                    <Route path="/dashboard" element={<BorrowAndOverdue />} />
                </Route>

                <Route element={<PrivateRoute requiredRole={"Admin"} />}>
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/user-list/user/:Id" element={<UpdateUser />} />
                    <Route path="/user-list/add-user" element={<AddUser />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App