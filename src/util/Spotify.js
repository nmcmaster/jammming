let accessToken;
let expiresIn;
const clientID = 'bd9d7ae014724f6dbc3740bb204cd1cc';
// const clientSecret = 'd92604614c84407c81c9734e116e86e4';
const redirectURI = 'http://localhost:3000';

const Spotify = {

    getAccessToken() {
      if(accessToken) {
        console.log('AT already set '+accessToken);
        return accessToken;
    }  else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
      {
        accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

        window.setTimeout(() => accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');
        console.log('option 2');
        return accessToken;
      }
      else
      {
        let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = url;
      }
    },
  search(term) {
  //  accessToken = this.getAccessToken();
    console.log(accessToken);
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    let obj = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    return fetch(url, obj).then(response => response.json()).then(jsonReponse => {
      if (jsonReponse.tracks.items) {
        return jsonReponse.tracks.items.map(x => {
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
