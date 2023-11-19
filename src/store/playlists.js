import { writable } from "svelte/store";

const createPlaylists = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setPlaylists: (playlists) => set(playlists)
    }
}

export const playlists = createPlaylists();