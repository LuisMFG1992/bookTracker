import { useDispatch } from 'react-redux'
import { addRemoveBookReadingList } from '../redux/booksSlice'

import { AiFillStar } from 'react-icons/ai'

const DisplayBooks = ({ booksList, readingList, filteredBooks }) => {
  const dispatch = useDispatch()

  const addBook = (book) => {
    dispatch(addRemoveBookReadingList(book))
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {(filteredBooks.length === 0 ? booksList : filteredBooks).map(
        (element) => (
          <button
            key={element.book.ISBN}
            className="relative transition-transform active:scale-110"
          >
            <img
              src={element.book.cover}
              alt={`${element.book.title} book`}
              className="w-[200px] h-[300px]"
              onClick={() => {
                addBook(element)
              }}
            />

            {readingList.some(
              (book) => book.book.ISBN === element.book.ISBN
            ) && (
              <AiFillStar
                className="absolute top-2 right-2 text-purple-600 bg-white rounded-full border border-purple-500"
                size={'2rem'}
              />
            )}
          </button>
        )
      )}
    </div>
  )
}

export default DisplayBooks
