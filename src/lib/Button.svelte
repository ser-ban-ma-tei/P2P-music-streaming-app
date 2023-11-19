<script>
  import { goto } from '$app/navigation';
  import { jsonToCssString } from '../utils/functions/jsonToCssString';
  import ButtonLoadingSpinner from './ButtonLoadingSpinner.svelte';

  export let text = '';
  export let href = '';
  export let styles = {};
  export let onClick = async () => {};
  export let loadingSpinner = false;

  let loading = false;

  const handleOnClick = async () => {
    loading = true;
    await onClick();
    loading = false;
    if (href) goto(href);
  };
</script>

<button
  on:click={handleOnClick}
  style={jsonToCssString(styles)}
>
  <div>
    <slot name="icon" />

    {#if loading && loadingSpinner}
      <div class="loading-spinner">
        <ButtonLoadingSpinner />
      </div>
    {/if}

    {text}
  </div>
</button>

<style>
  button {
    border: none;
    border-radius: 4px;
    margin: 0;
    padding: 0;

    width: 175px;
    height: 32px;

    background-color: var(--primary);
    color: var(--text);

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .loading-spinner {
    position: relative;
    bottom: 5px;
    right: 10px;
  }
</style>
