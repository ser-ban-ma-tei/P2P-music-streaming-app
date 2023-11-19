import { writable } from "svelte/store";

const createCurrentGenre = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setCurrentGenre: (genre) => set(genre)
    }
}

export const currentGenre = createCurrentGenre();