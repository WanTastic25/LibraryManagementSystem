import Login from './Login.jsx'
import BookCatalogue from './member_pages/BookCatalogue.jsx'
import Register from './member_pages/Register.jsx'
import UpdateBook from './UpdateBook.jsx'
import BookDetails from './BookDetails.jsx'
import BookList from './BookList.jsx'
import AddBook from './AddBook.jsx'
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
        </div>
    )
}

export default App