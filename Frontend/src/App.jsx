import Login from './Login.jsx'
import BookCatalogue from './member_pages/BookCatalogue.jsx'
import Register from './member_pages/Register.jsx'
import UpdateBook from './staff_pages/UpdateBook.jsx'
import BookDetails from './member_pages/BookDetails.jsx'
import BookList from './staff_pages/BookList.jsx'
import AddBook from './staff_pages/AddBook.jsx'
import AddUser from './admin_only_pages/AddUser.jsx'
import UserList from './admin_only_pages/UserList.jsx'
import { useState } from 'react'

function App() {
    const [bookId, setBookId] = useState(null)
    const [editBookId, setEditBookId] = useState(null)

    return (
        <div>
            <Login />
            <Register />
            <BookCatalogue onViewMore={setBookId} />
            <BookDetails bookId={bookId} />
            <BookList onEdit={setEditBookId}/>
            <UpdateBook editBookId={editBookId}/>            
            <AddBook/>
            <AddUser/>
            <UserList />
        </div>
    )
}

export default App