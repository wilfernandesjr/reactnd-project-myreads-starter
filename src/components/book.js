import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { bookInfo, onUpdateBook } = this.props

    const authors = bookInfo.authors ? bookInfo.authors.join().replace(/,/g, ', ') : '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookInfo.imageLinks ? bookInfo.imageLinks.smallThumbnail : '//placeholdit.co//i/128x189'}")` }}></div>
          <div className="book-shelf-changer">
            <select value={bookInfo.shelf || 'none'} onChange={e => onUpdateBook(e.target.value, bookInfo) }>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookInfo.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }

}

export default Book