<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import PlayerProgressBar from './PlayerProgressBar.svelte';
  import PlayerControls from './PlayerControls.svelte';
  import PlayerVolume from './PlayerVolume.svelte';
  import PlayerSongDetails from './PlayerDetails.svelte';
  import { playingSong } from '../../store/playingSong';
  import { user } from '../../store/user';

  let audio;
  let currentTime;
  let duration;
  let buffered;
  let paused;

  let hls;

  $: if (hls && $playingSong) {
    hls.loadSource(`http://127.0.0.1:8080/ipfs/${$playingSong?.cid}`);
    audio.play();
    audio = audio;
    window.api.streamSongUpdate($playingSong.id);
    window.api.addRecentlyPlayed({
      songId: $playingSong.id,
      userId: $user.id,
    });
  }

  onMount(() => {
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.attachMedia(audio);
    }
  });
</script>

<div>
  <audio
    bind:this={audio}
    bind:currentTime
    bind:duration
    bind:buffered
    bind:paused
  />

  <PlayerSongDetails song={$playingSong} />
  <PlayerControls
    {audio}
    {paused}
  />
  <PlayerProgressBar
    {audio}
    {currentTime}
    {duration}
    buffered={buffered?.at(-1)?.end}
  />
  <PlayerVolume {audio} />
</div>

<style>
  div {
    height: 10vh;
    width: 100%;

    position: absolute;
    bottom: 0;
    z-index: 1;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-top: 3px solid var(--background-light);
  }
</style>
