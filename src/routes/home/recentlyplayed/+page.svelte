<script>
  import PaginatedSongs from '../../../lib/PaginatedSongs.svelte';
  import { user } from '../../../store/user';

  const paginatedApiFunction = (page, perPage) => async () => {
    return await window.api.getRecentlyPlayed({
      pagination: {
        page: page,
        perPage: perPage,
      },
      queryParams: {
        sort: '-created',
        expand: 'song, song.user',
      },
      userId: $user?.id,
    });
  };
</script>

<PaginatedSongs
  pageTitle="Recently played songs"
  {paginatedApiFunction}
/>
