import React, { Component } from 'react'

class OptionList extends Component {
  render() {
    const options = this.props.options
    return (
      <select
        value={this.props.book.shelf === undefined ? 'none' : this.props.book.shelf}
        onChange={(e) => {this.props.changeBookShelf(this.props.book, e.target.value)}}
      >
        {Object.keys(options).map((optionKey)=>(
          <option key={optionKey} value={optionKey}>{options[optionKey]}</option>
        ))}
      </select>
    )
  }
}

export default OptionList