// Make a request to the Spotify API for the current user's "Now Playing" track
//When revisited the long term after Bearer in authorization needs to be change, that is the token from sign in

export async function getNowPlaying(){
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: 'Bearer BQBdg_b_ZJ9mB6lnnZ7pvw8vaZpgScyEdGPZG7kBZDMul0XQHG4tTr5cboHO6RKBrt0soh5CxR9lo9fI-vhbt-sfiBXamzLJOF_rW56Q17anzih9raKREV-n6MCorV0jDRjonWXrjRCCZ9S1DHGfLYNaBfoHpz-S4DaYwytMqMjkXg6xpt2RgoO6gFs7H6Ya2wk6ofs', // Replace with your actual access token
    },
  });
  if(!response.ok){
    throw new Error('Failed to fetch current playing track');
  }

  const data = await response.json();
  const album = data.item.album.name;
  const artist = data.item.artists[0].name;
  return {artist, album};
}

getNowPlaying().then((trackInfo) => {console.log(trackInfo.album +' by '+ trackInfo.artist)});



