// Return all books that match at least 1 element in the second array
export function getFilterBooksByGenre(books, genres) {
  return books.filter((libro) =>
    genres.some((element) => element === libro.book.genre)
  )
}

// Return quantity of filtered books
export function getQtyBooksfiltered(books, genres) {
  const qty = getFilterBooksByGenre(books, genres)
  return books.length - qty.length
}

// Return all the genres in a array
export const getGenres = (arr) => {
  const genresSet = new Set(arr.map((element) => element.book.genre))
  const arrGenre = [...genresSet]
  return arrGenre
}

// Return filteredBook
export const getFilteredBooksOnReadingList = (arr1, arr2) => {
  return arr1.filter((element) =>
    arr2.some((elem) => element.book.genre === elem)
  )
}
