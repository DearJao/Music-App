import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteList: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.rFavorite();
  }

  rFavorite = () => {
    const { favSongList, trackId } = this.props;
    if (favSongList.some((song) => song.trackId === trackId)) {
      this.setState({ favoriteList: true });
    } else {
      this.setState({ favoriteList: false });
    }
  }

  // parte da função handleCheckBox foi adpatada de um função do stackoverflow
  handleCheckBox = () => {
    this.setState((prevState) => ({
      loading: true,
      favoriteList: !prevState.favoriteList,
    }), async () => {
      const { foundMusics } = this.props;
      const { favoriteList } = this.state;
      if (favoriteList) {
        await addSong(foundMusics);
        this.setState({ loading: false });
      // } else {
      //   await removeSong(foundMusics);
      //   this.setState({ loading: false });
      // }
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteList } = this.state;
    return (
      <div>
        <div>
          <h4>{trackName}</h4>

          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>

          {loading ? (
            <Loading />
          ) : (
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              name="isFavorite"
              checked={ favoriteList }
              onChange={ this.handleCheckBox }
            />
          )}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favSongList: PropTypes.arrayOf(PropTypes.object).isRequired,
  foundMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
