import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';

class SearchForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleSearch = this.handleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      value: e.target.value.toLowerCase()
    });
  } 

  submitSearch(e) {
    if (e.key === 'Enter' || e.key === 13) {
      this.props.history.push(`/catalogue/search=${this.state.value}`);
      e.preventDefault();
    }
  }

  render() {
    return (
      <form className="header-main__search" type="submit">
        <input type="text"
          placeholder="Поиск"
          value={this.state.value}
          onChange={this.handleSearch.bind(this)}
          onKeyPress={this.submitSearch.bind(this)}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
      </form>
    )
  }
}
export default withRouter(SearchForm);
