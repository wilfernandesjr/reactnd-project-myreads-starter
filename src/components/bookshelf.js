import React, { Component } from 'react'
import Book from './book'

class Bookshelf extends Component {
  
  render() {
    const { shelf, books, onUpdateBook } = this.props
    let title = ''

    switch(shelf) {
      case 'currentlyReading':
        title = 'Currently Reading'
        break
      case 'wantToRead':
        title = 'Want To Read'
        break
      default:
        title = 'Read'
        break
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book onUpdateBook={onUpdateBook} bookInfo={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Bookshelf