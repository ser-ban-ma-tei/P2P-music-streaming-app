import { secondsToMinutesAndSeconds } from './secondsToMinutesAndSeconds';

export const songsResponseToSongObject = (response, likedSongs) => response.map(song => ({
    name: song.name,
    artist: song.expand.user.username,
    duration: secondsToMinutesAndSeconds(song.duration),
    cid: song.cid,
    id: song.id,
    liked: likedSongs.find((likedSong) => song.id === likedSong.song)?.id,
}))

export const playlistsResponseToPlaylistObject = (playlists) => playlists.map((playlist) => ({
    name: playlist.name,
    id: playlist.id
}))