import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import OptionList from './OptionList'

// 查找图书页面
class SearchBooks extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  // 更新查询关键字
  updateQueryBooks = query => {
    this.setState({query: query})
    BooksAPI.search(query).then(books=>{
      if (books === undefined) {this.setState({showingBooks:[]})}
      else {this.setState({showingBooks: books})}
    })
  }

  render() {
    const {query} = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>back</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQueryBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <OptionList
                        options = {this.props.shelfs}
                        book = {book}
                        changeBookShelf = {this.props.changeBookShelf}
                      />
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
    )
  }
}

export default SearchBooks