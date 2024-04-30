import logo from '../assets/logo.png'
import FavList from '../assets/FavList.png'
import SearchBar from './SearchBar'

import { IoIosSearch } from 'react-icons/io'

const Navbar = ({ handelSidabar, readingList }) => {
  return (
    <nav className="inline-flex justify-between items-center w-full h-[8vh] pt-1 px-4 pb-2 fixed top-0 bg-gray-001 z-10">
      <a href="#">
        <img src={logo} className="w-[130px] h-[40px]" alt="logo" />
      </a>

      <div className="inline-flex justify-between items-center gap-4 sm:gap-2">
        {/* <SearchBar /> */}
        <div className="inline-flex">
          <IoIosSearch size={'2.5rem'} className="sm:hidden" />
        </div>
        <div className="flex gap-5 relative" onClick={handelSidabar}>
          <img
            src={FavList}
            className="w-[35px] p-1"
            alt="readindList button"
          />
          <div className="absolute cursor-pointer left-4 top-7 bg-white border-2 border-purple-900 text-purple-900 w-[28px] font-bold rounded-full flex justify-center">
            {readingList.length}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
