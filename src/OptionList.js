import React, { Component } from 'react'


// 选项组件
class OptionList extends Component {

  render() {
    const { options, book, books } = this.props
    let shelf = book.shelf
    // 依据是否存在books属性，判断数据是否是从SearchBooks传来
    if (Array.isArray(books)) {
      for (let i=0;i<books.length;i++) {
        if (book.id === books[i].id) {shelf = books[i].shelf ; break}
        else { shelf = 'none'}
    }}
    console.log(shelf)
    return (
      <select
        value={shelf}
        onChange={(e) => {this.props.changeBookShelf(book, e.target.value)}}
      >
        {Object.keys(options).map((optionKey)=>(
          <option key={optionKey} value={optionKey}>{options[optionKey]}</option>
        ))}
      </select>
    )
  }
}

export default OptionList