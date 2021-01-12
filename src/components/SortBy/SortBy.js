import React from 'react';
import '../../css/style-catalogue.css';

class SortBy extends React.Component {
  sortIt = (e) => {
    this.props.updateType(e.target.name, e.target.value);
  }

  render() {
    return (
      <div className="product-catalogue__sort-by">
        <p className="sort-by">Сортировать</p>
        <select name="sortBy" id="sorting" onChange={this.sortIt}>
          <option value="">По умолчанию</option>
          <option value="popularity">по популярности</option>
          <option value="price">по цене</option>
        </select>
      </div>
    )
  }
}

export default SortBy;
