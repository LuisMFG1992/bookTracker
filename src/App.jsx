import './App.css'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchBooks, setIsLoading } from './redux/booksSlice'

import DisplayBooks from './Components/DisplayBooks'
import DropDownFilter from './Components/DropDownFilter'
import DisplayFilters from './Components/DisplayFilters'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Loader from './Components/Loader'
// import SliderFilter from './Components/SliderFilter'

function App() {
  const dispatch = useDispatch()

  const {
    booksList,
    selectedFilters,
    genres,
    readingList,
    qtyBooksFiltered,
    isLoading,
  } = useSelector((state) => state.books)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handelSidabar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handelFetch = async () => {
    dispatch(setIsLoading())
    await dispatch(fetchBooks())
    dispatch(setIsLoading())
  }

  useEffect(() => {
    handelFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="w-full bg-[#202124] flex-col justify-center items-center min-h-screen">
      {isSidebarOpen && (
        <aside className="absolute top-0">
          <Sidebar handelSidabar={handelSidabar} readingList={readingList} />
        </aside>
      )}
      <Navbar handelSidabar={handelSidabar} readingList={readingList} />

      <section className="w-full px-5 pt-20 sm:px-0 max-w-[2000px] min-h-screen flex items-center flex-col gap-2">
        {isLoading !== true ? (
          <>
            <div className="flex flex-col gap-0 lg:flex-row lg:gap-10  text-2xl p-4 text-center">
              <p>Total disponibles: {booksList.length - readingList.length}</p>
              <p>Lista en lectura: {readingList.length}</p>

              <p>Libros filtrados disponibles: {qtyBooksFiltered.length}</p>

              {/* {selectedFilters.length !== 0 && (
                <p>Libros filtrados disponibles: {qtyBooksFiltered}</p>
              )} */}
            </div>
            <DisplayFilters selectedFilters={selectedFilters} />
            <div className="w-full flex gap-8 items-center justify-evenly flex-wrap sm:flex-row sm:justify-evenly">
              {/* <SliderFilter /> */}
              <DropDownFilter genres={genres} />
            </div>
            <DisplayBooks
              booksList={booksList}
              selectedFilters={selectedFilters}
              readingList={readingList}
            />
          </>
        ) : (
          <Loader />
        )}
      </section>
    </main>
  )
}

export default App
