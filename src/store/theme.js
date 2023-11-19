import { readable } from "svelte/store";

const MAIN_ONE = '#EA4541';
const MAIN_TWO = '#a7302f';
const DARK_BACKGROUND_ONE = '#000';
const DARK_BACKGROUND_TWO = '#181818';
const DARK_TEXT = '#FFFFFF';

const darkTheme = {
  MAIN_ONE,
  MAIN_TWO,
  BACKGROUND_ONE: DARK_BACKGROUND_ONE,
  BACKGROUND_TWO: DARK_BACKGROUND_TWO,
  TEXT: DARK_TEXT
}

export const theme = readable(darkTheme)