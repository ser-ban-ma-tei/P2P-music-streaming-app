<script>
  import Button from '../../lib/Button.svelte';
  import TextInput from '../../lib/TextInput.svelte';

  let email = '';
  let password = '';
  let username = '';

  const register = async () => {
    await window.api.register({
      email,
      emailVisibility: true,
      password,
      passwordConfirm: password,
      username,
    });
  };
</script>

<div class="register-container">
  <TextInput
    placeholder="email"
    type="email"
    bind:value={email}
    containerStyles={{ marginBottom: '10px', width: '325px' }}
  >
    <i
      class="fa-solid fa-user"
      slot="icon"
    />
  </TextInput>

  <TextInput
    placeholder="password"
    type="password"
    bind:value={password}
    containerStyles={{ marginBottom: '15px', width: '325px' }}
  >
    <i
      class="fa-solid fa-key"
      slot="icon"
    />
  </TextInput>

  <TextInput
    placeholder="username"
    type="text"
    bind:value={username}
    containerStyles={{ marginBottom: '15px', width: '325px' }}
  >
    <i
      class="fa-solid fa-signature"
      slot="icon"
    />
  </TextInput>

  <div class='buttons'>
  <Button
    text="Register"
    styles={{ width: '325px', marginBottom: '15px' }}
    onClick={register}
    loadingSpinner={true}
  />
  <Button
    text="Back to login"
    styles={{ width: '325px' }}
    href='/'
  />
</div>
</div>

<style>
  .register-container {
    height: fit-content;
    width: fit-content;

    position: absolute;
    top: 40%;
    left: 41.25%;
  }

  .buttons {
    display: flex;
    flex-direction: column;
  }
</style>
