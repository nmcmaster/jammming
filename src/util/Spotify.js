let accessToken;
let expiresIn;
const clientID = 'bd9d7ae014724f6dbc3740bb204cd1cc';
// const clientSecret = 'd92604614c84407c81c9734e116e86e4';
const redirectURI = 'localhost:3000';

const Spotify = {
  getAccessToken() {
    console.log('being called');
    if (accessToken) {
      console.log(accessToken);
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log(accessToken);
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
    }, search(term) {
    accessToken = this.getAccessToken();
    console.log(accessToken);
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    let obj = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    return fetch(url, obj).then(response => response.json()).then(jsonReponse => {
      if (jsonReponse.tracks.items) {
        jsonReponse.tracks.items.map(x => {
          return {id: x.id,
                  name: x.name,
                  artist: x.artists[0].name,
                  album: x.album.name,
                  uri: x.uri}
        });
      } else {
        let arr = [];
        return arr;
      }
    })
  }

};



module.exports = Spotify;
