import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react'
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

function App() {
    const [bookId, setBookId] = useState(null)
    const [editBookId, setEditBookId] = useState(null)
    const [editUserId, setEditUserId] = useState(null)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<PrivateRoute requiredRole="Member" />}>
                    <Route path="/catalogue" element={<BookCatalogue />} />
                    <Route path="/catalogue/book/:bookId" element={<BookDetails />} />
                </Route>

                <Route element={<PrivateRoute requiredRole="Admin" />}>
                    <Route path="/book-list" element={<BookList />} />
                    <Route path="/book-list/book/:bookId" element={<UpdateBook />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App