<script>
  import { playingSong } from '../../store/playingSong';
  export let song;
</script>

<div class="player-details-container">
  {#if $playingSong}
    <div>
      <p class="song-title">{song?.name || ''}</p>
      <p>{song?.artist || ''}</p>
    </div>
  {/if}
</div>

<style>
  .player-details-container {
    width: 17.5%;
    display: flex;
    justify-content: center;
  }

  .song-title {
    font-weight: 600;
  }
</style>
