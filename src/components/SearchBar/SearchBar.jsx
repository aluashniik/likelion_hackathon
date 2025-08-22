import React from 'react'
import search_icon from '../../assets/search_icon.png'
import delete_icon from '../../assets/delete_icon.png'
import './SearchBar.css'
import { useState } from 'react'

const SearchBar = () => {

  const [searchItem, setSearchItem] = useState("");
  const handleDelete = () => {
    setSearchItem("");
  }


  return (
    <div className="search-bar">
        <img src={search_icon} alt="" className='search-icon'/>
        <input type='search' value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}
        placeholder='제목이나 내용으로 검색해보세요!'className="search-input"/>
        <button type='button' onClick={handleDelete} disabled={!searchItem.trim()} className='delete-btn'>
          <img src={delete_icon} alt="" className='delete-icon'/>
        </button>
    </div>
  )

}

export default SearchBar