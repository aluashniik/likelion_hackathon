import React from 'react'
import search_icon from '../../assets/search_icon.png'
import delete_icon from '../../assets/delete_icon.png'
import './SearchBar.css'

const SearchBar = ({ value, onSearch, onSubmit }) => {

  const handleDelete = () => {
    onSearch('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
        <img src={search_icon} alt="" className='search-icon'/>
        <input 
            type='search' 
            value={value} 
            onChange={(e)=>onSearch(e.target.value)}
            placeholder='제목이나 내용으로 검색해보세요!'
            className="search-input"
        />
        <button type='button' onClick={handleDelete} disabled={!value.trim()} className='delete-btn'>
          <img src={delete_icon} alt="" className='delete-icon'/>
        </button>
    </form>
  )

}

export default SearchBar