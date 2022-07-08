import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  componentDidUpdate() {
    if (isFavorite) {
      this.handleAddSong();
    }
  }

  handleAddSong = async () => {
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({
      loading: false,
    });
  }

  handleCheckBox = ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true, isFavorite: checked });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;
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
              id="isFavorite"
              name="isFavorite"
              checked={ isFavorite }
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
};

export default MusicCard;
