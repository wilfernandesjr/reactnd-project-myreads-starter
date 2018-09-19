import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import SearchPage from './components/searchPage'
import ListBooksTitle from './components/listBooksTitle'
import Bookshelf from './components/bookshelf'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => (
      this.setState({ books })
    ))
  }

  updateBook(shelf, book) {
    const finded = this.state.books.find(item => item.id === book.id) 
    
    if (finded) {
      this.setState(state => ({
        books: state.books.map(b => {
          if(b.id === book.id) b.shelf = shelf
          return b
        })
      }))
    } else {
      this.setState(state => ({
        books: state.books.push(book)
      }))
    }
    
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search" render={() => (
            <SearchPage onUpdateBook={this.updateBook.bind(this)} books={this.state.books} />
          )} />

          <Route exact path="/" render={() => (
            <div className="list-books">
              <ListBooksTitle />
              <div className="list-books-content">
                <div>
                  {['currentlyReading', 'wantToRead', 'read'].map((shelf, index) => (
                    <Bookshelf
                      key={index}
                      shelf={shelf}
                      onUpdateBook={this.updateBook.bind(this)}
                      books={
                        this.state.books.filter(
                          book => book.shelf === shelf
                        )
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
