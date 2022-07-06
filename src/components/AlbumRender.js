import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class AlbumRender extends React.Component {
  render() {
    const { albumProp } = this.props;

    return (
      <div key={ albumProp.artistId }>
        <img src={ albumProp.artworkUrl100 } alt="art of the  album" />

        <h3>{ albumProp.collectionName }</h3>

        <p>{ albumProp.artistName }</p>

        <Link
          to={ `album/${albumProp.collectionId}` }
          data-testid={ `link-to-album-${albumProp.collectionId}` }
        >
          { albumProp.collectionId }
        </Link>

      </div>
    );
  }
}

AlbumRender.propTypes = {
  albumProp: propTypes.shape({
    artistId: propTypes.number.isRequired,
    artistName: propTypes.string.isRequired,
    collectionName: propTypes.string.isRequired,
    artworkUrl100: propTypes.string.isRequired,
    collectionId: propTypes.number.isRequired,
  }).isRequired,
};

export default AlbumRender;
