<script>
  import { jsonToCssString } from '../utils/functions/jsonToCssString';

  export let placeholder = '';
  export let value = '';
  export let type = 'text';
  export let inputStyles = {};
  export let containerStyles = {};
  export let onKeyPress = () => {};

  const onInput = (e) => {
    value = e.target.value;
  };
</script>

<div style={jsonToCssString(containerStyles)}>
  <span>
    <slot name="icon" />
  </span>
  <input
    {type}
    {placeholder}
    {value}
    style={jsonToCssString(inputStyles)}
    on:input={onInput}
    on:keypress={onKeyPress}
  />
</div>

<style>
  div {
    position: relative;
    width: 175px;
  }
  input {
    border: 2px solid var(--background-light);
    border-radius: 4px;
    outline: none;

    background-color: transparent;
    color: var(--text);

    width: 100%;
    height: 32px;

    padding-left: 36px;

    font-size: 14px;
  }

  span {
    position: absolute;
    left: 12px;
    top: 6px;
  }
</style>
