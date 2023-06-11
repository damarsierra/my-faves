import * as React from 'react';
import axios from 'axios';
import qs from 'qs';
import * as RB from 'react-bootstrap';

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const ARTIST_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;

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

const App = () => {
  const [artists, setArtists] = React.useState([]);

  const fetchItems = async (endpoint, setState) => {
    const { access_token } = await getAccessToken();
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    setState(data.items);
    // setAlbums(data.items.map(item => {
    //   return getAlbums(item.href)
    // }));
  }

  React.useEffect(() => {
      fetchItems(ARTIST_ENDPOINT, setArtists);
  }, []);

  return (
    <div className='col-lg-8 mx-auto p-4 py-md-5'>
      <header className='d-flex align-items-center pb-3 mb-5 border-bottom'>
        <h1 className='h1'>Hello!</h1>
        
      </header>
      <main>
        <p className="fs-5 col-md-8">These are my most listened to artists on spotify!</p>
        <RB.Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Albums</th>
            </tr>
          </thead>
          <tbody>
            {artists.map(artist => <Row key={artist.id} artist={artist} />)}
          </tbody>
        </RB.Table>
      </main>
      
    </div>
  )
}

const Row = ({ artist }) => {
  const [albums, setAlbums] = React.useState([]);

  const getAlbums = async (href) => {
    const { access_token } = await getAccessToken();
    const endpoint = `${href}/albums?limit=3`;
    const { data } = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    // console.log(data.items);
    setAlbums(data.items);
  }

  React.useEffect(() => {
    getAlbums(artist.href);
    console.log(albums);
  }, []);

  return (
    <tr>
      <th scope="row">{artist.name}</th>
      <td><RB.Image src={artist.images[0].url} alt={artist.name} height="150" rounded /></td>
      <td>
        <RB.ListGroup>
          {albums.map((album) => <RB.ListGroup.Item key={album.id}>{album.name}</RB.ListGroup.Item>)}
        </RB.ListGroup></td>
    </tr>
  );
}

export default App
