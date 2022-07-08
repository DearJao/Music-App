import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      foundMusics: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.searchMusicAlbum();
  }

  searchMusicAlbum = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({
      loading: true,
    },

    async () => {
      const findMusics = await getMusics(id);

      this.setState({
        artistName: findMusics[0].artistName,
        albumName: findMusics[0].collectionName,
        foundMusics: findMusics,
        loading: false,
      });
    });
  }

  render() {
    const {
      artistName,
      albumName,
      foundMusics,
      loading,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            Album
            <h4 data-testid="artist-name">{ artistName }</h4>
            <p data-testid="album-name">{ albumName }</p>

            {foundMusics
              .filter((preview) => preview.kind === 'song')
              .map((preview, index) => (
                <MusicCard
                  key={ index }
                  trackId={ preview.trackId }
                  trackName={ preview.trackName }
                  previewUrl={ preview.previewUrl }
                />
              ))}
          </div>

        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
