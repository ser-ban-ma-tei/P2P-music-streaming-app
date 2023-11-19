<script>
  import { onMount } from 'svelte';
  import { user } from '../store/user';
  import { jsonToCssString } from '../utils/functions/jsonToCssString';
  import { playlistsResponseToPlaylistObject } from '../utils/functions/responsesToUsefulObjects';
  import Button from './Button.svelte';
  import LinkButton from './LinkButton.svelte';
  import Modal from './Modal.svelte';
  import TextInput from './TextInput.svelte';
  import { currentPlaylist } from '../store/currrentPlaylist';
  import { playlists } from '../store/playlists';

  const predefinedPlaylistTextStyles = {
    fontSize: '22px',
    fontWeight: '600',
    marginLeft: '3px',
  };

  let userPlaylists = [];
  let openNewPlaylistModal = false;
  let newPlaylist = '';

  const handleNewPlaylist = async () => {
    if (!newPlaylist) return;

    await window.api.addNewPlaylist({
      name: newPlaylist,
      user: $user.id,
    });

    await loadData();

    openNewPlaylistModal = false;
  };

  const loadData = async () => {
    const userPlaylistsResponse = await window.api.getFullList({
      collection: 'playlists',
      queryParams: {
        filter: `user = "${$user.id}"`,
        sort: '+created',
      },
    });

    const arrangedPlaylists = playlistsResponseToPlaylistObject(
      userPlaylistsResponse,
    );
    userPlaylists = arrangedPlaylists;
    playlists.setPlaylists(arrangedPlaylists);
  };

  onMount(async () => {
    await loadData();
  });
</script>

<div class="container">
  <div class="predefined-playlists">
    <LinkButton
      text="Most wanted"
      href="/home/mostwanted"
      textStyles={predefinedPlaylistTextStyles}
    >
      <i
        class="fa-solid fa-fire"
        style:font-size="22px"
        slot="icon"
      />
    </LinkButton>
    <LinkButton
      text="Recently played"
      href="/home/recentlyplayed"
      textStyles={predefinedPlaylistTextStyles}
    >
      <i
        class="fa-solid fa-angles-left"
        style:font-size="22px"
        slot="icon"
      />
    </LinkButton>
    <LinkButton
      text="Liked songs"
      href="/home/likedsongs"
      textStyles={predefinedPlaylistTextStyles}
    >
      <i
        class="fa-solid fa-heart"
        style:font-size="22px"
        slot="icon"
      />
    </LinkButton>
  </div>

  <div class="user-playlists">
    <Button
      text="New playlist"
      styles={{ width: '80%' }}
      onClick={() => (openNewPlaylistModal = true)}
    >
      <i
        class="fa-solid fa-circle-plus"
        slot="icon"
      />
    </Button>
    <div class="user-playlists-list">
      {#each userPlaylists as playlist}
        <LinkButton
          text={playlist.name}
          onClick={() => currentPlaylist.setCurrentPlaylist(playlist)}
          href="/home/playlist"
          textStyles={{ fontSize: '18px' }}
        />
      {/each}
    </div>
  </div>
</div>

<Modal
  bind:open={openNewPlaylistModal}
  modalStyles={{ paddingTop: '200px' }}
  modalContentStyles={{ width: '20%' }}
>
  <h3
    style={jsonToCssString({ width: 'fit-content', display: 'inline-block' })}
    slot="title"
  >
    Create a new playlist
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
    <TextInput
      bind:value={newPlaylist}
      placeholder="playlist name"
      containerStyles={{ width: '90%' }}
    >
      <i
        class="fa-solid fa-music"
        slot="icon"
      />
    </TextInput>
    <Button
      text="Create"
      styles={{ width: '90%' }}
      onClick={handleNewPlaylist}
      loadingSpinner
    />
  </div>
</Modal>

<style>
  .container {
    float: left;
    height: 90vh;
    width: 16%;

    background-color: var(--background-primary);
    border-right: 3px solid var(--background-light);
  }

  .predefined-playlists {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;

    border-bottom: 3px solid var(--background-light);
  }

  .user-playlists {
    width: 100%;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .user-playlists-list {
    width: 80%;
    margin-top: 5px;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
