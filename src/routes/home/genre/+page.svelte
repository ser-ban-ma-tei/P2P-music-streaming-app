<script>
  import { user } from '../../../store/user';
  import { currentGenre } from '../../../store/currentGenre';
  import PaginatedSongs from '../../../lib/PaginatedSongs.svelte';

  const paginatedApiFunction = (page, perPage) => async () => {
    return await window.api.getSongs({
      pagination: {
        page: page,
        perPage: perPage,
      },
      queryParams: {
        filter: `genre.name = "${$currentGenre}"`,
        sort: '-streams',
      },
      userId: $user?.id,
    });
  };
</script>

<PaginatedSongs
  pageTitle={$currentGenre.toUpperCase()}
  {paginatedApiFunction}
/>
