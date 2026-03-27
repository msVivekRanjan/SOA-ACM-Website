# SOA ACM Student Chapter Website

This repository contains the source code for the official website of the SOA ACM Student Chapter, built using React and Vite.

## Important Project Information

**Please read the following carefully before making changes or deploying.**

### 1. Build Process

This is a Vite/React project and requires a build step to generate the static HTML, CSS, and JavaScript files needed for deployment.

-   **Build Command:** `npm run build` (or `yarn build`)
-   **Output Directory:** The build process creates a `dist` directory containing the deployable website files.

### 2. Deployment Methods & Configuration

This project is configured for deployment to multiple platforms. The configuration is sensitive to ensure correct asset paths.

**Essential Configuration File:**

-   `vite.config.ts`: Contains the `base` path setting.
    -   This file uses `process.env.GITHUB_ACTIONS` to conditionally set the correct `base` path:
        -   `/sau-acm-student-chapter/` for GitHub Pages builds (when run via the GitHub Actions workflow).
        -   `/` for local builds (used for cPanel deployment) and Netlify builds.
    -   **Do not modify this logic** unless you understand the implications for all deployment targets.

**Deployment Targets:**

*   **GitHub Pages (Project Site):**
    *   URL: `https://sau-acm-student-chapter.github.io/sau-acm-student-chapter/`
    *   Deployment Method: Automated via GitHub Actions workflow (`.github/workflows/github-pages.yml`).
    *   Workflow details: Builds the project *within the action* (setting the correct base path) and pushes the `dist` contents to the `gh-pages` branch.
    *   **Essential File:** The workflow automatically adds a `.nojekyll` file to the deployment root (`gh-pages` branch) to ensure correct file serving.
    *   **Note:** The `dist` folder is **not** committed to the `main` branch for this deployment method.

*   **cPanel (`sauchapter.acm.org` or similar):**
    *   Deployment Method: **Manual Build & Commit** using cPanel Git Version Control.
    *   **Workflow:**
        1.  Make source code changes.
        2.  **Run `npm run build` locally.** This generates the `dist` folder with `base: '/'`.
        3.  **Commit ALL changes**, including the *entire* `dist` folder, to the `main` branch (`git add .`, `git commit`, `git push`).
        4.  Log in to cPanel -> Git Version Control -> Manage -> Pull or Deploy -> Update from Remote -> Deploy HEAD Commit.
    *   **Essential Files:**
        -   `.cpanel.yml`: Contains the deployment script (copies `dist/*` to `/home/sauchapter/public_html/`). **Ensure the `DEPLOYPATH` is correct.** Do not modify unless the deployment path changes.
        -   `public/.htaccess`: Contains Apache rewrite rules necessary for client-side routing to work on cPanel. This is copied to `dist` during the build.
    *   **Requirement:** You **MUST** run `npm run build` locally and commit the `dist` folder *before* pushing changes intended for cPanel deployment. The `.cpanel.yml` script only *copies* the committed `dist` folder; it does not build the project.

*   **Netlify:**
    *   Deployment Method: Likely connected directly to the GitHub repository (`main` branch).
    *   Configuration: Netlify runs its own build process. The `vite.config.ts` correctly sets `base: '/'` in the Netlify build environment (as `GITHUB_ACTIONS` is not `true`).
    *   Build Settings (Typical): Check Netlify UI - usually `npm run build` (or `yarn build`) as the build command and `dist` as the publish directory.

### 3. Key Files & Directories - Do Not Modify Without Understanding

-   `.github/workflows/github-pages.yml`: Defines the automated deployment to GitHub Pages.
-   `.cpanel.yml`: Defines the deployment steps for cPanel's Git feature (relies on committed `dist` folder).
-   `vite.config.ts`: Crucial build configuration, especially the `base` path logic.
-   `public/.htaccess`: Required for correct routing on Apache servers (cPanel).
-   `.gitignore`: Should **not** list `/dist` if using the cPanel manual build & commit method. (Currently configured this way).

### 4. Development

-   Install dependencies: `npm install` (or `yarn install`)
-   Run development server: `npm run dev` (or `yarn dev`)
-   Linting/Formatting: (Add details if linters/formatters like ESLint/Prettier are set up)

---

*Remember to keep documentation updated if build or deployment processes change.*