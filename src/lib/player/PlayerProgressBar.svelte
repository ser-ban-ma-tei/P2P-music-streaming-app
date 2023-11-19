<script>
  import { onMount } from 'svelte';
  import { secondsToMinutesAndSeconds } from '../../utils/functions/secondsToMinutesAndSeconds';

  export let audio;
  export let currentTime;
  export let duration;
  export let buffered;

  let value = 0;
  let bufferedValue = 0;
  let progress;
  let progressRect;
  let dragging = false;
  let indicatorLeft = null;

  const INDICATOR_LEFT_OFFSET = -7;
  const INDICATOR_BOTTOM_OFFSET = 5;
  const WIDTH = 500;

  $: value = (currentTime / duration) * 100;
  $: bufferedValue = (buffered / duration) * 100;

  $: if (!dragging) {
    indicatorLeft = INDICATOR_LEFT_OFFSET + (value * WIDTH) / 100;
  }

  const onClick = (event) => {
    if (!progressRect) return;
    const clickXPlacement = event.clientX - progressRect.left;
    const clickProgressPlacement = (clickXPlacement / progressRect.width) * 100;
    audio.currentTime = (clickProgressPlacement * audio.duration) / 100;
  };

  const moveIndicator = (event) => {
    if (!dragging) return;

    if (
      event.clientX >= progressRect.left &&
      event.clientX <= progressRect.right
    ) {
      indicatorLeft = INDICATOR_LEFT_OFFSET + event.clientX - progressRect.left;
    }
  };

  const letGoOfIndicator = (event) => {
    if (!dragging) return;
    dragging = false;
    const clickXPlacement = event.clientX - progressRect.left;
    const clickProgressPlacement = (clickXPlacement / progressRect.width) * 100;
    audio.currentTime = (clickProgressPlacement * audio.duration) / 100;
  };

  onMount(() => {
    progressRect = progress.getBoundingClientRect();
  });
</script>

<svelte:window
  on:mousemove={moveIndicator}
  on:mouseup={letGoOfIndicator}
/>

<div class="container">
  <span> {secondsToMinutesAndSeconds(currentTime)} </span>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="progress"
    on:click={onClick}
    bind:this={progress}
    style:width={`${WIDTH}px`}
    style:background={`linear-gradient(to right, #e9003f ${value}%, transparent ${value}%), linear-gradient(to right, #a7302f ${bufferedValue}%, #000000 ${bufferedValue}%)`}
  >
    <div
      class="indicator"
      on:mousedown={() => (dragging = true)}
      style:bottom={`${INDICATOR_BOTTOM_OFFSET}px`}
      style:left={`${
        indicatorLeft === null ? INDICATOR_LEFT_OFFSET : indicatorLeft
      }px`}
    />
  </div>
  <span> {secondsToMinutesAndSeconds(duration)} </span>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
  }

  span {
    color: var(--text);
  }

  .progress {
    margin: 10px;
    height: 7px;
    border-radius: 15px;
    cursor: pointer;
    background-color: var(--background-secondary);
  }

  .indicator {
    display: inline-block;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background-color: var(--primary);
    position: relative;
  }
</style>
