# office-checkout-timer

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment to GitHub Pages

The [deployment workflow](.github/workflows/deploy.yml) builds the app with Node.js 22
using `npm ci` and `npm run build`, then publishes `dist` to GitHub Pages on every
push to `main` (including merged pull requests).

### One-time setup

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, change **Source** from **Deploy from a branch**
   to **GitHub Actions**.
3. Commit and push the workflow to `main`.

You can also deploy manually from **Actions → Deploy to GitHub Pages → Run workflow**
by selecting `main`. Manual runs on other branches only build the app.

The site URL is https://Sourav1018.github.io/office-time-calculator/.
The Vite base path is already configured for this repository. Publishing commits
to the `gh-pages` branch is no longer needed after switching the Pages source.
The workflow uses GitHub's built-in token; no personal access token or additional
repository secrets are required.

See [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
