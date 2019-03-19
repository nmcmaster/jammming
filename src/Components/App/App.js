import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'Metallica',
         artist: 'Picasso',
         album: 'Derp',
         id: '1'
       },
        {name: 'MegaD',
         artist: 'Mustaine',
         album: 'Derp in Peace',
         id: '2'
       },{name: 'Slayer',
         artist: 'hanneman',
         album: 'South',
         id: '3'
      }
      ], playlistName: 'Yo play',
      playlistTracks: [
        {name: 'Drought',
         artist: 'Future',
         album: 'DS2',
         id: '4',
         uri: 'spotify:track:5ihDGnhQgMA0F0tk9fNLlA'},
        {name: 'Serve',
         artist: 'Future',
         album: 'DS2',
         id: '5',
         uri: 'spotify:track:1Rq4GtIucW9CAcF8B6PAbW'},
        {name: 'Lil one',
         artist: 'Future',
         album: 'DS2',
         id: '6',
         uri: 'spotify:track:4Bt9yX2Gq7Q1biRF45EN1C'},
        {name: 'Rotation',
         artist: 'Future',
         album: 'DS2',
         id: '7',
         uri: 'spotify:track:0FA8Pw164j1qW4YEfpaVRy'}
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    Spotify.getAccessToken();
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let tempPlaylist = this.state.playlistTracks;
      tempPlaylist.push(track);
      this.setState({
        playlistTracks: tempPlaylist
      });
    }
//      console.log(this.state.playlistTracks);
  }
  removeTrack(track) {
    let tempPlaylist = this.state.playlistTracks.filter(x => x.id !== track.id);
    this.setState({
      playlistTracks: tempPlaylist
    })
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  //  console.log(this.state.playlistName);
  }
  savePlaylist() {
    Spotify.savePlaylist('derp','derpp');
    /*  let trackURIarr = [];
    this.state.playlistTracks.map(x => {
      trackURIarr.push(x.uri);
    });
    console.log(trackURIarr);
    return trackURIarr; */
  }
  search(term) {
    Spotify.search(term).then(res => this.setState({
      searchResults: res
    }));

  }
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
      <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
