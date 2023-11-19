<script>
  import { playingSong } from '../store/playingSong';
  import { playlists } from '../store/playlists';
  import { user } from '../store/user';
  import { jsonToCssString } from '../utils/functions/jsonToCssString';
  import LinkButton from './LinkButton.svelte';
  import Modal from './Modal.svelte';

  export let song;

  let internalLike = undefined;
  let openAddSongToPlaylistModal = false;

  const handleSetPlayingSong = () => {
    if (song.id === $playingSong?.id) return;
    playingSong.setPlayingSong(song);
  };

  const handleToggleLikedSong = async (action) => {
    const success = await window.api.toggleLikedSong({
      songId: song.id,
      userId: $user.id,
      likedId: song.liked,
      action,
    });

    if (success) internalLike = action === 'add' ? true : false;
  };

  const handleAddSongToPlaylist = async (playlistId) => {
    await window.api.addSongToPlaylist({ song: song.id, playlist: playlistId });
    openAddSongToPlaylistModal = false;
  };
</script>

<div class="song-container">
  <div class="song-details">
    <p class="song-title">{song.name}</p>
    <p>{song.artist}</p>
  </div>

  <span> {song.duration} </span>

  <div class="song-actions">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
      class="fa-solid fa-play"
      on:click={handleSetPlayingSong}
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if internalLike !== undefined}
      {#if internalLike === true}
        <i
          class="fa-solid fa-heart"
          on:click={() => handleToggleLikedSong('remove')}
        />
      {:else if internalLike === false}
        <i
          class="fa-regular fa-heart"
          on:click={() => handleToggleLikedSong('add')}
        />
      {/if}
    {:else if song.liked}
      <i
        class="fa-solid fa-heart"
        on:click={() => handleToggleLikedSong('remove')}
      />
    {:else}
      <i
        class="fa-regular fa-heart"
        on:click={() => handleToggleLikedSong('add')}
      />
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <i
      class="fa-solid fa-plus"
      on:click={() => (openAddSongToPlaylistModal = true)}
    />
  </div>
</div>

<Modal
  bind:open={openAddSongToPlaylistModal}
  modalStyles={{ paddingTop: '200px' }}
  modalContentStyles={{ width: '20%' }}
>
  <h3
    style={jsonToCssString({ width: 'fit-content', display: 'inline-block' })}
    slot="title"
  >
    Add song to a playlst
  </h3>
  <div
    slot="content"
    style={jsonToCssString({
      width: '100%',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center',
    })}
  >
    {#each $playlists as playlist}
      <LinkButton
        text={playlist.name}
        onClick={() => handleAddSongToPlaylist(playlist.id)}
      >
        <i
          class="fa-solid fa-plus"
          slot="icon"
        />
      </LinkButton>
    {/each}
  </div>
</Modal>

<style>
  .song-container {
    width: 100%;
    height: 60px;

    padding-left: 12px;
    padding-right: 12px;

    border: 3px solid var(--background-light);
    border-radius: 4px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .song-title {
    font-weight: 600;
  }

  .song-details {
    display: flex;
    flex-direction: column;
    width: 10%;
  }

  .song-actions {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  i {
    font-size: 20px;
    color: var(--primary);
    cursor: pointer;
  }
</style>
