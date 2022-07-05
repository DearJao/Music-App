import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isSearchBtnDisable: true,
    };
  }

    handleChange = ({ target }) => {
      this.setState({
        artistName: target.value,
      }, () => {
        this.handleCheckLength();
      });
    };

    handleCheckLength = () => {
      const { artistName } = this.state;

      const minCaractersNumber = 2;

      if (artistName.length >= minCaractersNumber) {
        this.setState({
          isSearchBtnDisable: false,
        }, () => {});
      } else {
        this.setState({
          isSearchBtnDisable: true,
        }, () => {});
      }
    };

    render() {
      const { artistName, isSearchBtnDisable } = this.state;
      return (
        <div data-testid="page-search">
          <form action="">
            <input
              data-testid="search-artist-input"
              type="text"
              name="artistName"
              value={ artistName }
              onChange={ this.handleChange }
            />

            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isSearchBtnDisable }
            >
              Procurar
            </button>
          </form>
          <Header />
        </div>
      );
    }
}

export default Search;
