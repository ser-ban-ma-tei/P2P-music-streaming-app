<script>
  import { user } from '../../../store/user';
  import { currentPlaylist } from '../../../store/currrentPlaylist';
  import PaginatedSongs from '../../../lib/PaginatedSongs.svelte';

  const paginatedApiFunction = (page, perPage) => async () => {
    return await window.api.getPlaylistSongs({
      pagination: {
        page: page,
        perPage: perPage,
      },
      queryParams: {
        filter: `playlist = "${$currentPlaylist.id}"`,
        sort: '-created',
        expand: 'song, song.user',
      },
      userId: $user?.id,
    });
  };
</script>

{#key $currentPlaylist}
  <PaginatedSongs
    pageTitle={$currentPlaylist.name}
    {paginatedApiFunction}
  />
{/key}
