<script>
  import PaginatedSongs from '../../../lib/PaginatedSongs.svelte';
  import { user } from '../../../store/user';

  const paginatedApiFunction = (page, perPage) => async () => {
    return await window.api.getLikedSongs({
      pagination: {
        page: page,
        perPage: perPage,
      },
      queryParams: {
        filter: `user = "${$user?.id}"`,
        expand: 'song, song.user',
      },
    });
  };
</script>

<PaginatedSongs
  pageTitle="Liked songs"
  {paginatedApiFunction}
/>
