import { writable } from "svelte/store";

const createCurrentPlaylist = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setCurrentPlaylist: (playlist) => set(playlist)
    }
}

export const currentPlaylist = createCurrentPlaylist();