import React, {Component} from 'react'
import OptionList from  './OptionList'

class ListShelfs extends Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.shelfs).slice(0,3).map((shelf)=>(
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfs[shelf] === 'none' ? '' : this.props.shelfs[shelf]}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books.filter((book)=>book.shelf === shelf).map((book)=>(
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <OptionList
                            options={this.props.shelfs}
                            book={book}
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
        ))}
      </div>
    )
  }
}

export default ListShelfs