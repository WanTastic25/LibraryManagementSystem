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
                <Route path="/catalogue" element={<BookCatalogue />} />
                <Route path="/book-list" element={<BookList />} />
            </Routes>
        </Router>

        /*<div>
            <Login />
            <Register />
            <BookCatalogue onViewMore={setBookId} />
            <BookDetails bookId={bookId} />
            <BookList onEdit={setEditBookId} />
            <UpdateBook editBookId={editBookId} />
            <AddBook />
            <AddUser />
            <UserList onEdit={setEditUserId} />
            <UpdateUser editUserId={editUserId}/>
        </div>*/
    )
}

export default App