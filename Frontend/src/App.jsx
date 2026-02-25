import Login from './Login.jsx'
import BookCatalogue from './member_pages/BookCatalogue.jsx'
import Register from './member_pages/Register.jsx'
import UpdateBook from './UpdateBook.jsx'
import BookView from './BookView.jsx'
import { useState } from 'react'

function App() {
    const [bookId, setBookId] = useState(null)

    return (
        <div>
            <Login />
            <Register />
            <BookCatalogue onViewMore={setBookId} />
            <BookView bookId={bookId} />
            <UpdateBook />
        </div>
    )
}

export default App