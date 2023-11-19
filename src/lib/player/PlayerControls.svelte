<script>
  import PlayIcon from '../icons/PlayIcon.svelte';
  import PauseIcon from '../icons/PauseIcon.svelte';
  import { playingSong } from '../../store/playingSong';

  export let audio;

  const onClick = () => {
    if (audio?.paused) {
      audio.play();
      audio = audio;
    } else {
      audio.pause();
      audio = audio;
    }
  };
</script>

<div class="player-controls-container">
  {#if $playingSong}
    {#if audio?.paused}
      <PlayIcon {onClick} />
    {:else}
      <PauseIcon {onClick} />
    {/if}
    <div style:width="40%" />
  {/if}
</div>

<style>
  .player-controls-container {
    width: 17.5%;
    display: flex;
    justify-content: center;
  }
</style>
