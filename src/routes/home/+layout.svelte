<script>
	import Navbar from '../../lib/Navbar.svelte';
	import Player from '../../lib/player/Player.svelte';
	import Sidebar from '../../lib/Sidebar.svelte';
</script>

<Navbar />
<Sidebar />
<Player />

<slot />
