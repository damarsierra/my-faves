import * as React from 'react';
import SpotifyMyArtists from './Spotify/SpotifyMyArtists'

const App = () => (
  <div className='col-lg-8 mx-auto p-4 py-md-5'>
    <header className='d-flex align-items-center pb-3 mb-5 border-bottom'>
      <h1 className='h1'>Hello!</h1>
    </header>
    <main>
      <SpotifyMyArtists />
    </main>
    
  </div>
);

export default App
