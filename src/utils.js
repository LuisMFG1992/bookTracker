export function filterBooksByGenre(books, genres) {
  return books.filter((libro) =>
    genres.some((element) => element === libro.book.genre)
  )
}

export function getQtyBooksfiltered(books, genres) {
  const qty = filterBooksByGenre(books, genres)
  return books.length - qty.length
}

export const getGenres = (arr) => {
  const genresSet = new Set(arr.map((element) => element.book.genre))
  const arrGenre = [...genresSet]
  return arrGenre
}
