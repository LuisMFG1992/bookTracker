// Return all books that match at least 1 element in the second array
export function filterBooksByGenre(books, genres) {
  return books.filter((libro) =>
    genres.some((element) => element === libro.book.genre)
  )
}

// Return quantity of filtered books
export function getQtyBooksfiltered(books, genres) {
  const qty = filterBooksByGenre(books, genres)
  return books.length - qty.length
}

// Return all the genres in a array
export const getGenres = (arr) => {
  const genresSet = new Set(arr.map((element) => element.book.genre))
  const arrGenre = [...genresSet]
  return arrGenre
}
