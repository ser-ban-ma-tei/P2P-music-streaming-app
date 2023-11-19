import { writable } from "svelte/store";

const createPlayingSong = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setPlayingSong: (playingSong) => set(playingSong)
    }
}

export const playingSong = createPlayingSong();