import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../css/style.css';

class Pagination extends React.Component {
  changePage = (e) => {
    this.props.updateType(e.target.name, e.target.textContent);
  }

  render() {
    let category;
    if (this.props.cat !== undefined) {
      category = `categoryId=${this.props.cat}`
    } else {
      category = 'discounted=1'
    };

    if (this.props.pages <= 1) { return (<div></div>); }
    else {
      let arrPages = [];
      for (let i = 1; i <= this.props.pages; i++) { arrPages.push(i); }

      return (
        <div className="product-catalogue__pagination">
          <div className="page-nav-wrapper">
            <div className="angle-back"><a href="#"></a> </div>
            {arrPages.map(page =>
              <Link
                onClick={this.changePage}
                className="active"
                name='page'
                to={{
                  pathname: `/catalogue/${category}`,
                  search: `?page=${page}`
                }}
              >
                {page}
              </Link>
            )}
            <div className="angle-forward"> <a href="#"></a></div>
          </div>
        </div>
      )
    }
  }
}

export default Pagination;
