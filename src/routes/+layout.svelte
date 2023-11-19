<svelte:head>
  <style>
    :root {
      --primary: #e9003f;
      --secondary: #a7302f;
      --background-primary: #181818;
      --background-dark: #080808;
      --background-light: #262626;
      --text: #d8d8d8;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    *,
    ::after,
    ::before {
      box-sizing: border-box;
    }

    body {
      background: var(--background-primary);
      font-family: 'Lato', sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    p,
    span {
      color: var(--text);
    }

    i {
      font-size: 16px;
      color: var(--text);
    }
  </style>
</svelte:head>

<slot />
