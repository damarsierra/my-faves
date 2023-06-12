import * as React from 'react';
import * as RB from 'react-bootstrap';
import fetchItems from './SpotifyAPI';
import { ARTIST_ENDPOINT } from './SpotifyAPI';

const SpotifyMyArtists = () => {
  const [artists, setArtists] = React.useState([]);

  React.useEffect(() => {
      fetchItems(ARTIST_ENDPOINT, setArtists);
  }, []);

  return (
    <div>
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
            {artists.map(artist => <SpotifyArtistDetails key={artist.id} artist={artist} fetchItems={fetchItems} />)}
          </tbody>
        </RB.Table>
    </div>
  );
}

const SpotifyArtistDetails = ({ artist, fetchItems }) => {
  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    fetchItems(`${artist.href}/albums?limit=3`, setAlbums);
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

export default SpotifyMyArtists