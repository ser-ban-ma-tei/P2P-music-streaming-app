<script>
  import { goto } from '$app/navigation';
  import { jsonToCssString } from '../utils/functions/jsonToCssString';

  export let text = '';
  export let href = '';
  export let textStyles = {};
  export let onClick = () => {};
</script>

<div class="container">
  <slot name="icon" />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p
    on:click={() => {
      onClick();
      goto(href);
    }}
    style={jsonToCssString(textStyles)}
  >
    {text}
  </p>
</div>

<style>
  .container {
    width: fit-content;
    display: inline-block;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  p {
    width: fit-content;
    cursor: pointer;
  }
</style>
