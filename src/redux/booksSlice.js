import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { getFilterBooksByGenre, getGenres } from '../utils'

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const response = await fetch('../../data/books.json')

  // await new Promise((resolve) => setTimeout(resolve, 100000))

  const data = await response.json()
  return data.library
})

export const saveBook = createAsyncThunk('book/save', async (book) => {
  const response = await fetch('../../data/books.json', {
    method: 'POST',
    headers: {
      'Context-Type': 'application/json',
    },
    body: {
      book,
    },
  })
  const data = await response.json()
  return data
})

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksList: [],
    genres: localStorage.getItem('genres')
      ? JSON.parse(localStorage.getItem('genres'))
      : [],
    selectedFilters: localStorage.getItem('selectedFilters')
      ? JSON.parse(localStorage.getItem('selectedFilters'))
      : [],
    readingList: localStorage.getItem('readingList')
      ? JSON.parse(localStorage.getItem('readingList'))
      : [],
    filteredBooks: localStorage.getItem('filteredBooks')
      ? JSON.parse(localStorage.getItem('filteredBooks'))
      : [],
    isLoading: false,
  },

  reducers: {
    addDropDownFilter: (state, action) => {
      state.selectedFilters.push(action.payload)
      localStorage.setItem(
        'selectedFilters',
        JSON.stringify(state.selectedFilters)
      )

      state.genres = state.genres.filter((genero) => genero !== action.payload)
      localStorage.setItem('genres', JSON.stringify(state.genres))

      state.filteredBooks = getFilterBooksByGenre(
        state.booksList,
        state.selectedFilters
      )
      localStorage.setItem('filteredBooks', JSON.stringify(state.filteredBooks))
    },
    removeDropDownFilter: (state, action) => {
      state.genres.push(action.payload)
      localStorage.setItem('genres', JSON.stringify(state.genres))

      state.selectedFilters = state.selectedFilters.filter(
        (genero) => genero !== action.payload
      )
      localStorage.setItem(
        'selectedFilters',
        JSON.stringify(state.selectedFilters)
      )

      state.filteredBooks = getFilterBooksByGenre(
        state.booksList,
        state.selectedFilters
      )
      localStorage.setItem('filteredBooks', JSON.stringify(state.filteredBooks))
    },
    addRemoveBookReadingList: (state, action) => {
      const alreadyInTheList = state.readingList.some(
        (element) => element.book.ISBN === action.payload.book.ISBN
      )
      if (!alreadyInTheList) {
        state.readingList.push(action.payload)
        toast.success(`${action.payload.book.title} añadido a tu lista.`)
      } else {
        state.readingList = state.readingList.filter(
          (element) => element.book.ISBN !== action.payload.book.ISBN
        )
        toast.success(`${action.payload.book.title} removido de tu lista.`)
      }
      localStorage.setItem('readingList', JSON.stringify(state.readingList))
    },
    setSharedData: (state, action) => {
      state[action.payload.key] = JSON.parse(action.payload.newValue)
    },
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.booksList = action.payload
      if (!localStorage.getItem('genres')) {
        state.genres = getGenres(state.booksList)
      }
    })
    builder.addCase(saveBook.fulfilled, (state, action) => {
      state.books.push(action.payload)
    })
  },
})

export const {
  addDropDownFilter,
  removeDropDownFilter,
  addRemoveBookReadingList,
  setSharedData,
  setIsLoading,
} = booksSlice.actions

export default booksSlice.reducer
