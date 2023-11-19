<script>
  import { onMount } from 'svelte';
  import SongsContainer from './SongsContainer.svelte';

  export let pageTitle = '';
  export let paginatedApiFunction = async () => {};
  export let songsPerPage = 9;

  let songs = [];
  let pagination = {};
  let pages = [];
  let noSongs = false;
  let noSpaceBetweenSongsAndPagination = false;

  onMount(async () => {
    const getSongs = paginatedApiFunction(1, songsPerPage);
    const songsResponse = await getSongs();

    songs = songsResponse?.items;
    pagination = {
      page: songsResponse?.page,
      perPage: songsResponse?.perPage,
      totalItems: songsResponse?.totalItems,
      totalPages: songsResponse?.totalPages,
    };
    pages = Array.from({ length: songsResponse?.totalPages }, (_, i) => ({
      pageNumber: i + 1,
      active: i === 0 ? true : false,
    }));
    noSongs = !songsResponse?.items?.length;
  });

  const changePage = async (newPageNumber) => {
    const getSongs = paginatedApiFunction(newPageNumber, songsPerPage);
    const songsResponse = await getSongs();
    songs = songsResponse?.items;

    const pagesArray = pages;

    const newPageIndex = pagesArray.findIndex(
      (page) => page.pageNumber === newPageNumber,
    );
    const currentPageIndex = pagesArray.findIndex(
      (page) => page.active === true,
    );

    pagesArray[newPageIndex].active = true;
    pagesArray[currentPageIndex].active = false;

    pages = pagesArray;
  };
</script>

<div
  class="songs-page"
  style:height={noSpaceBetweenSongsAndPagination && 0}
>
  <div class="songs">
    <h1 class="header">{pageTitle}</h1>
    {#if noSongs}
      <h3>No songs...</h3>
    {:else}
      <SongsContainer {songs} />
    {/if}
  </div>
  <div class="pagination">
    {#each pages as page}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        on:click={() => changePage(page.pageNumber)}
        class={`page ${page.active ? 'active-page' : ''}`}
      >
        {page?.pageNumber}
      </span>
    {/each}
  </div>
</div>

<style>
  .songs-page {
    width: 84%;
    height: 82.5vh;
    float: right;
    display: flex;
    flex-direction: column;
  }

  .songs {
    margin-left: 3.33%;
    margin-right: 3.33%;
  }

  .header {
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: auto;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
  }

  .page {
    margin-left: 55px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }

  .active-page {
    color: var(--primary);
  }

  .active-page:hover {
    color: var(--primary);
  }
</style>
