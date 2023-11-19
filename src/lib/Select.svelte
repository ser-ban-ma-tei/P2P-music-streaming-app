<script>
  export let options = [];
  export let selected;
</script>

<div class="select-container">
  <select bind:value={selected}>
    {#each options as option (option.id)}
      <option value={option.value}> {option.label} </option>
    {/each}
  </select>
</div>

<style>
  .select-container {
    position: relative;
    width: 175px;
  }

  select {
    outline: none;
    width: 100%;
    height: 32px;
    border: 2px solid var(--background-light);
    border-radius: 4px;
    padding: 0.25em 0.5em;
    cursor: pointer;
    background: var(--background-primary);
    color: var(--text);
  }
</style>
