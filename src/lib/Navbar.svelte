<script>
  import { playingSong } from '../store/playingSong';
  import { user } from '../store/user';
  import { jsonToCssString } from '../utils/functions/jsonToCssString';
  import LinkButton from './LinkButton.svelte';
  import Modal from './Modal.svelte';
  import SongsContainer from './SongsContainer.svelte';
  import TextInput from './TextInput.svelte';

  const tabsStyles = {
    fontSize: '24px',
    fontWeight: '600',
  };

  let searchText = '';
  let searchedSongs = [];
  let openSearchModal = false;

  const searchSongs = async () => {
    const searchedSongsResponse = await window.api.getSongs({
      pagination: {
        page: 1,
        perPage: 10,
      },
      queryParams: {
        filter: `name ~ "${searchText}"`,
        sort: '-streams',
      },
      userId: $user?.id,
    });

    searchedSongs = searchedSongsResponse.items;

    openSearchModal = true;
  };

  const onSearchEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchSongs();
    }
  };
</script>

<div class="header">
  <TextInput
    bind:value={searchText}
    debounced={1200}
    placeholder="search for songs..."
    containerStyles={{ width: '35%' }}
    onKeyPress={onSearchEnterKeyPress}
  >
    <i
      class="fa-solid fa-magnifying-glass"
      slot="icon"
    />
  </TextInput>

  <div class="tabs">
    <LinkButton
      text="Home"
      href="/home"
      textStyles={tabsStyles}
    >
      <i
        class="fa-solid fa-house"
        style:font-size="20px"
        slot="icon"
      />
    </LinkButton>
    <LinkButton
      text="Add song"
      href="/home/addsong"
      textStyles={tabsStyles}
    >
      <i
        class="fa-solid fa-plus"
        style:font-size="25px"
        slot="icon"
      />
    </LinkButton>
    <LinkButton
      text="Logout"
      href="/"
      textStyles={tabsStyles}
      onClick={async () => {
        await window.api.logout();
        playingSong.setPlayingSong(null);
      }}
    >
      <i
        class="fa-solid fa-right-from-bracket"
        style:font-size="25px"
        slot="icon"
      />
    </LinkButton>
  </div>
</div>

<Modal
  bind:open={openSearchModal}
  modalStyles={{ paddingTop: '200px' }}
  modalContentStyles={{ width: '35%' }}
>
  <h3
    style={jsonToCssString({ width: 'fit-content', display: 'inline-block' })}
    slot="title"
  >
    Songs searched with: {searchText}
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
      maxHeight: '500px',
    })}
  >
    <SongsContainer songs={searchedSongs} />
  </div>
</Modal>

<style>
  .header {
    height: 7.5vh;
    width: 84%;
    display: block;
    float: right;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    background-color: transparent;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    gap: 25px;
  }
</style>
