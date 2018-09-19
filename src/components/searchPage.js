import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'

import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
  state = {
    query: '',
    search: []
  }

  updateQuery(query) {
    this.setState({ query })

    if (!query) return this.setState({ search: [] });

    this.throttleSearch(query)
  }

  searchBooks(query) {
    BooksAPI.search(query)
      .then(search => {
        if (!search || search.error) return this.setState({ search: [] })

        search = search.map(book => {
          const finded = this.props.books.find((item) => book.id === item.id)
          if (finded) {
            book.shelf = finded.shelf
            return book
          }

          book.shelf = 'none'
          return book
        })

        this.setState({ search })
      })
  }

  isSearching = false

  throttleSearch(query) {
    if (this.isSearching) return
    this.isSearching = true
    this.searchBooks(query)
    setTimeout(() => this.isSearching = false, 300)
  }

  render() {
    const { query, search } = this.state
    const { onUpdateBook, books } = this.props
    let noResult = ''

    if (!search.length && query) {
      noResult = <p>No results found! :(</p>
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={ query } onChange={e => this.updateQuery(e.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {noResult}
            {search.map(book => (
              <li key={book.id}>
                <Book onUpdateBook={onUpdateBook} books={books} bookInfo={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchPage