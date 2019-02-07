import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListShelfs from './ListShelfs'

class BooksApp extends React.Component {
  state = {
    shelfs: {read: 'read', currentlyReading: 'currentlyReading', wantToRead: 'wantToRead', none: 'none'},
    books: []
  }

  // 启动时获取一次所有书记
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState(()=>({books: books})))
  }
  changeBookShelf = (book, shelf) => {
    this.setState((prevState)=>{
      prevState.books.splice(prevState.books.indexOf(book),1)
      book.shelf = shelf
      return {books: prevState.books.concat([book])}
    })
    BooksAPI.update(book, shelf)
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={()=>(
          <SearchBooks
            shelfs={this.state.shelfs}
            books={this.state.books}
            changeBookShelf={this.changeBookShelf}/>
        )}/>
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <ListShelfs
                shelfs={this.state.shelfs}
                books={this.state.books}
                changeBookShelf={this.changeBookShelf}
              />
            </div>
            <div className="open-search">
              <Link to='/search'>Add book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
