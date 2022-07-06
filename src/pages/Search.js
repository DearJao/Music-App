import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumRender from '../components/AlbumRender';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchArtistName: '',
      isSearchBtnDisable: true,
      loading: false,
      artists: '',
      albums: '',
    };
  }

    handleChange = ({ target }) => {
      this.setState({
        searchArtistName: target.value,
        artists: target.value,
      }, () => {
        this.handleCheckLength();
      });
    };

    handleCheckLength = () => {
      const { searchArtistName } = this.state;

      const minCaractersNumber = 2;

      if (searchArtistName.length >= minCaractersNumber) {
        this.setState({
          isSearchBtnDisable: false,
        }, () => {});
      } else {
        this.setState({
          isSearchBtnDisable: true,
        }, () => {});
      }
    };

    handleSearchArtist = async () => {
      const { searchArtistName } = this.state;

      this.setState({
        loading: true,
      });

      const search = await searchAlbumsAPI(searchArtistName);
      this.setState({
        albums: search,
        searchArtistName: '',
        loading: false,
      }, () => this.handleCheckLength());
    }

    render() {
      const {
        searchArtistName,
        isSearchBtnDisable,
        loading,
        artists,
        albums,
      } = this.state;

      return (
        <div data-testid="page-search">
          <Header />
          {loading ? <Loading />
            : (
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="search-artist-input"
                  value={ searchArtistName }
                  onChange={ this.handleChange }
                />

                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ isSearchBtnDisable }
                  onClick={ this.handleSearchArtist }
                >
                  Pesquisar
                </button>
              </form>
            )}

          <div>
            { artists && (<h4>{ `Resultado de álbuns de: ${artists}` }</h4>) }

            { albums !== undefined && albums.length >= 1
              ? albums.map((albumProp) => (
                <AlbumRender key={ albumProp.collectionId } albumProp={ albumProp } />))
              : <p>Nenhum álbum foi encontrado</p> }
          </div>

        </div>
      );
    }
}

export default Search;
