import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    shelfs: [],
    books: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState(()=>{
      let shelfs = new Set();
      for (let i=0;i<books.length;i++){shelfs.add(books[i].shelf)}
      return {shelfs: Array.from(shelfs), books: books}
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' component={SearchBooks}/>
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelfs.map((shelf)=>(
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelf}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((book)=>book.shelf === shelf).map((book)=>(
                          <li key={shelf+book.title}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
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
