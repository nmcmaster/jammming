import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  render() {
    return (
    <div className="TrackList">
      {this.props.tracks.map((x) => {
      return <Track key={x.id} track={x} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />
        }
      )}
    </div>
    );
  }
}

export default TrackList;
