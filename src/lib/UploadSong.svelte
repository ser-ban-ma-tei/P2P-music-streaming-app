<script>
  import Button from './Button.svelte';
  import TextInput from './TextInput.svelte';
  import { user } from '../store/user';
  import Select from './Select.svelte';
  import { onMount } from 'svelte';

  let songPath = '';
  let songName = '';
  let songGenre = '';

  let uploading = false;
  let uploadStatus = '';
  let genres = [{ value: '', label: 'Select song genre', id: '-1' }];

  $: if (uploadStatus === 'success') {
    songPath = '';
    songName = '';
    songGenre = '';
  }

  const handleSongSelection = async () => {
    const { filePaths } = await window.api.openDialog();
    songPath = filePaths[0];
  };

  const handleSongUpload = async () => {
    uploading = true;
    uploadStatus = await window.api.uploadSong({
      songPath,
      userId: $user.id,
      songName,
      songGenre,
    });
    uploading = false;
  };

  onMount(async () => {
    const genresResponse = await window.api.getFullList({
      collection: 'genres',
    });

    genres = [
      ...genres,
      ...genresResponse.map((genre) => ({
        value: genre.id,
        label: `${genre.name.at(0).toUpperCase()}${genre.name.slice(1)}`,
        id: genre.id,
      })),
    ];
  });
</script>

<div class="upload-song">
  <TextInput
    placeholder="song name"
    bind:value={songName}
  >
    <i
      class="fa-solid fa-music"
      slot="icon"
    />
  </TextInput>

  <Select
    options={genres}
    bind:selected={songGenre}
  />

  <Button
    text="Select song"
    onClick={handleSongSelection}
  />

  {#if songPath}
    <p>File: {songPath.split('/').at(-1)}</p>
  {:else}
    <p>File: not selected</p>
  {/if}

  <Button
    text="Upload song"
    onClick={handleSongUpload}
    disabled={songPath && songName ? false : true}
  />

  {#if uploading}
    <p>Song is uploading...</p>
  {:else if uploadStatus === 'success'}
    <p>Song uploaded successfully.</p>
  {:else}
    <p>{uploadStatus}</p>
  {/if}
</div>

<style>
  .upload-song {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
</style>
