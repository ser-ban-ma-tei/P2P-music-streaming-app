<script>
  import PaginatedSongs from '../../../lib/PaginatedSongs.svelte';
  import { user } from '../../../store/user';

  const paginatedApiFunction = (page, perPage) => async () => {
    return await window.api.getSongs({
      pagination: {
        page: page,
        perPage: perPage,
      },
      queryParams: {
        sort: '-streams',
      },
      userId: $user?.id,
    });
  };
</script>

<PaginatedSongs
  pageTitle="Most wanted songs"
  {paginatedApiFunction}
/>
