<script>
  import Song from './Song.svelte';
  import LinkButton from './LinkButton.svelte';

  export let songs = [];
  export let width = null;
  export let header = null;
</script>

<div
  class="songs-container"
  style:width
>
  {#if header}
    <div class="songs-header">
      <h2>{header.title}</h2>
      <LinkButton
        text={header.action.text}
        href={header.action.href}
      />
    </div>
  {/if}
  <div class="songs-list">
    {#each songs as song}
      <Song {song} />
    {/each}
  </div>
</div>

<style>
  .songs-container {
    width: 100%;
  }

  .songs-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .songs-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
  }
</style>
