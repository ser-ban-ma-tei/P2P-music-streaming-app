<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { user } from '../../store/user';
  import { currentGenre } from '../../store/currentGenre';
  import SongsContainer from '../../lib/SongsContainer.svelte';

  let mostWantedSongs = [];
  let recentlyPlayedSongs = [];
  let genres = [];

  const loadData = async () => {
    const mostWantedSongsResponse = await window.api.getSongs({
      pagination: {
        page: 1,
        perPage: 3,
      },
      queryParams: {
        sort: '-streams',
      },
      userId: $user?.id,
    });

    const recentlyPlayedSongsResponse = await window.api.getRecentlyPlayed({
      pagination: {
        page: 1,
        perPage: 3,
      },
      queryParams: {
        sort: '-created',
        expand: 'song, song.user',
      },
      userId: $user?.id,
    });

    const genresResponse = await window.api.getFullList({
      collection: 'genres',
    });

    mostWantedSongs = mostWantedSongsResponse.items;
    recentlyPlayedSongs = recentlyPlayedSongsResponse.items;
    genres = genresResponse;
  };

  onMount(async () => {
    await loadData();
  });

  const handleClickGenre = (e) => {
    currentGenre.setCurrentGenre(e.target.outerText.toLowerCase());
    goto('/home/genre');
  };
</script>

<div class="home-page">
  <h1 class="heading">
    Welcome back, <span class="username">{$user?.username}</span>!
  </h1>
  <div class="home-songs">
    <SongsContainer
      songs={mostWantedSongs}
      header={{
        title: 'Most wanted',
        action: {
          text: 'Show more',
          href: '/home/mostwanted',
        },
      }}
      width="45%"
    />
    <SongsContainer
      songs={recentlyPlayedSongs}
      header={{
        title: 'Recently played',
        action: {
          text: 'Show more',
          href: '/home/recentlyplayed',
        },
      }}
      width="45%"
    />
  </div>
  <div class="genres">
    <h2 class="genres-title">Genres</h2>
    <div class="genres-list">
      {#each genres as genre}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="genre"
          on:click={handleClickGenre}
        >
          <span> {genre.name} </span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .heading {
    margin-left: 3.33%;
    margin-bottom: 15px;
  }

  .username {
    color: var(--primary);
  }

  .home-page {
    width: 84%;
    height: 82.5vh;
    float: right;
  }

  .home-songs {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .genres {
    margin-top: 25px;
    margin-left: 3.33%;
    margin-right: 3.33%;
  }

  .genres-title {
    margin-bottom: 15px;
  }

  .genres-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 90px;
    justify-content: space-between;
  }

  .genre {
    border: 2px solid var(--background-light);
    border-radius: 5px;
    width: 20%;
    height: 15vh;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 32px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .genre:hover {
    background-color: var(--primary);
    border: none;
    cursor: pointer;
    transition: 0.15s;
  }
</style>
