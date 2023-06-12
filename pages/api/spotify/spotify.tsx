// Make a request to the Spotify API for the current user's "Now Playing" track
//When revisited the long term after Bearer in authorization needs to be change, that is the token from sign in

export async function getNowPlaying(){
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: 'Bearer BQBEcmwId0lKyWQqky9s6NCnUOFvs7NUKQkxROsSS2LzkQ_1sA3i_6SGdJjx8IQajI_pyL5bYfeAfPX_f9dK0opiLOjH5FUaEntZ6_w2TI8g_3rJyYTdN7sXquvieYRLUJnp4eeDXHGKo7Xv3rM5FltFKhmZ7amjzwc30aysVUvhBSo6uyEHR85FnspkEBaFqZGk87A', // Replace with your actual access token
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



