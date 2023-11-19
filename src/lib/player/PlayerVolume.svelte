<script>
  import VolumeOffIcon from '../icons/VolumeOffIcon.svelte';
  import VolumeOnIcon from '../icons/VolumeOnIcon.svelte';
  import { playingSong } from '../../store/playingSong';

  export let audio;

  let muted = false;

  const handleInputChange = (e) => {
    const target = e.target;

    const min = target.min;
    const max = target.max;
    const val = target.value;

    if (audio) {
      audio.volume = val / 100;
      audio = audio;
    }

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';

    if (val === '0') {
      muted = true;
    } else {
      muted = false;
    }
  };
</script>

<div>
  {#if $playingSong}
    {#if muted}
      <VolumeOffIcon />
    {:else}
      <VolumeOnIcon />
    {/if}
    <input
      type="range"
      on:input={handleInputChange}
      min={0}
      max={100}
    />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 15%;
  }

  input[type='range'] {
    appearance: none;
    margin-left: 5px;
    cursor: pointer;
    height: 7px;
    border-radius: 15px;
    background: #000;
    background-image: linear-gradient(var(--primary), var(--primary));
    background-size: 50% 100%;
    background-repeat: no-repeat;
  }

  input[type='range']::-webkit-slider-thumb {
    appearance: none;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: var(--primary);
  }

  input[type='range']::-webkit-slider-runnable-track {
    appearance: none;
  }
</style>
