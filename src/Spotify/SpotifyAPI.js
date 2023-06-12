import axios from 'axios';
import qs from 'qs';

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
export const TOP_ARTIST_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;

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

export default async function fetchItems (endpoint) {
  const { access_token } = await getAccessToken();
  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  return data.items;
}
