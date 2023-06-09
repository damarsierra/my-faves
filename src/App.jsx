import * as React from 'react';
import axios from 'axios';
import qs from 'qs';

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ARTIST_ENDPOINT = `https://api.spotify.com/v1/artists`;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
}



function App() {
  const [artist, setArtist] = React.useState({});

  const artistId = `7nqOGRxlXj7N2JYbgNEjYH`;

  const getArtist = async (client_id, client_secret, refresh_token, artistId) => {
    const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);
    const { data } = await axios.get(`${ARTIST_ENDPOINT}/${artistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    setArtist(data);
  }

  React.useEffect(() => {
    getArtist(client_id, client_secret, refresh_token, artistId);
  });

  return (
    <div>
      <h1>Hello!</h1>
      
      <p>{artist.name}</p>
    </div>
  )
}

export default App
