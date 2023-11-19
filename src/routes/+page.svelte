<script>
  import Button from '../lib/Button.svelte';
  import TextInput from '../lib/TextInput.svelte';
  import LinkButton from '../lib/LinkButton.svelte';
  import { user } from '../store/user';
  import { goto } from '$app/navigation';

  let email = 'example@gmail.com';
  let password = 'secretpassword';
  let loginFailed = '';

  const login = async () => {
    const userResponse = await window.api.login({
      email,
      password,
    });
    if (!userResponse) {
      loginFailed = 'No user has been found.';
      return;
    }

    user.setUser(userResponse);
    goto('/home');
  };
</script>

<div class="login-page-container">
  <div class="login-container">
    <div class="login-failed">
      <h4>{loginFailed}</h4>
    </div>

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

    <Button
      text="Login"
      styles={{ width: '325px' }}
      onClick={login}
      loadingSpinner
    />

    <div class="other-options">
      <LinkButton
        text="Register"
        href="/register"
      >
        <i
          class="fa-solid fa-user-plus"
          slot="icon"
        />
      </LinkButton>
    </div>
  </div>
</div>

<style>
  .login-page-container {
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-container {
    height: fit-content;
    width: fit-content;
  }

  .other-options {
    margin-top: 9px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .login-failed {
    width: 100%;
    height: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
