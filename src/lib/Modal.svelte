<script>
  import { jsonToCssString } from '../utils/functions/jsonToCssString';

  export let open = false;
  export let modalStyles = {};
  export let modalContentStyles = {};

  let display = 'hidden';
  $: display = open ? 'block' : 'none';

  let modal;
</script>

<div
  class="modal"
  style:display
  bind:this={modal}
  style={jsonToCssString(modalStyles)}
>
  <div
    class="modal-content"
    style={jsonToCssString(modalContentStyles)}
  >
    <div class="modal-header">
      <slot name="title" />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i
        class="fa-solid fa-circle-xmark close-button"
        on:click={() => {
          open = false;
        }}
      />
    </div>
    <slot name="content" />
  </div>
</div>

<svelte:window
  on:click={(e) => {
    if (e.target == modal) open = false;
  }}
/>

<style>
  .modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(1px);
  }

  .modal-content {
    background-color: var(--background-primary);
    margin: auto;
    padding: 15px;
    border: 3px solid var(--background-light);
    border-radius: 4px;
    width: 40%;
  }

  .close-button {
    color: var(--text);
    font-size: 20px;
  }

  .close-button:hover {
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 15px;
  }
</style>
