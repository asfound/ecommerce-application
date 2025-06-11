# HUH Coffee

Welcome to the [HUH Coffee](https://huh-coffee.top/) project! ☕️

### Table of Contents

- [About](#about)
- [Technical Stack](#technical-stack)
- [Local Setup](#local-setup)
- [Avaliable Scripts](#avaliable-scripts)
- [Team](#team)

## About

At [HUH Coffee](https://huh-coffee.top/), we’re all about making your coffee moments unforgettable. Whether you're into bold, intense dark roasts, or prefer the bright and lively flavors of light roasts, we've got you covered. And let’s not forget our awesome coffee accessories — because every coffee lover deserves the best tools to brew perfection.

Our sleek, easy-to-navigate website is designed to give you the smoothest shopping experience possible. No clutter, no fuss — just great coffee and the accessories you need to brew it right.

### Some key features:

🔐 Login & Registration: Secure and simple authentication system to get you brewing in no time.

🏠 Main Page: A clean and engaging landing page that welcomes users with featured products and key highlights.

📋 Product Catalog: Browse dark roasts, light roasts, and coffee gear with intuitive filtering and category navigation.

🔎 Detailed Product View: Get up close with every item — descriptions, specs, and rich visuals to help you choose your perfect cup.

🛒 Basket Page: Add, edit, and manage your picks with a dynamic and responsive shopping cart.

👤 User Profile: Manage personal info, order history, and preferences in one simple, accessible space.

💅 About Us: Learn more about our mission, vision, and the story behind HUH Coffee.

### Purpose:

This project is the final task for the _JavaScript/Front-end 2024Q4_ course at [Rolling Scopes School](https://rs.school). It showcases the skills and knowledge gained throughout the program — from responsive layout and interactive UI to modern development practices and clean code.

## Technical Stack

- **Frontend**: Developed with [TypeScript](https://www.typescriptlang.org/), [HTML](https://www.w3schools.com/html/), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), and [modern-normalize](https://github.com/sindresorhus/modern-normalize) — delivering a responsive, clean, and consistent UI 🎨
  - **UI Utilities**: Enhanced with [Swiper](https://swiperjs.com/) for touch sliders and [toastify-js](https://github.com/apvarun/toastify-js/) for elegant notifications ✨
  - **Utility Library**: [Lodash](https://lodash.com/) for modern JavaScript utilities 📚

- **Backend Integration**: Powered by [CommerceTools](https://commercetools.com/), a leading provider of commerce solutions for B2C and B2B enterprises 🌐
  - **Validation**: [Postcode validator](https://www.npmjs.com/package/postcode-validator) for address validation 📮

- **Bundler**: Uses [Vite](https://vitejs.dev/) for lightning-fast builds, HMR, and a modern development workflow ⚡

- **Testing**: Ensures reliability with [Vitest](https://vitest.dev/) 🧪

- **Code Quality**: Maintained through tools like [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Stylelint](https://stylelint.io/), [Perfectionist](https://eslint-plugin-perfectionist.azat.io/), [EditorConfig](https://editorconfig.org/), and [Husky](https://typicode.github.io/husky/) ✅
  - **Git Hooks**: [validate-branch-name](https://www.npmjs.com/package/validate-branch-name) for consistent branch naming 🌿

- **CI/CD & Deployment**: Automations handled with [GitHub Actions](https://github.com/features/actions), and live deployment on [Netlify](https://www.netlify.com/) 🚀

- **Architecture**: While we haven’t committed to a specific architecture, we follow a component-based structure and aim to avoid unnecessary complexity, keeping things as simple and maintainable as the scale of the e-commerce application allows 🧩

## Local Setup

- Clone the repository: `git clone https://github.com/asfound/ecommerce-application.git`

- Navigate to the project directory: `cd ecommerce-application`

- Install dependencies: `npm install`

- Create a `.env` file in the root directory and add your environment variables (CommerceTools credentials):

```
VITE_CTP_PROJECT_KEY=<project key>
VITE_CTP_CLIENT_SECRET=<client secret>
VITE_CTP_CLIENT_ID=<client id>
VITE_CTP_AUTH_URL=<auth url>
VITE_CTP_API_URL=<api url>
VITE_CTP_SCOPES=<scopes>
```

- Run the project: `npm run dev`

The application should now be available at `http://localhost:5173` 🚀

## Avaliable Scripts


| Command                   | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Initiates the Vite development server              |
| `npm run build`           | Compiles TypeScript and builds the app using Vite  |
| `npm run preview`         | Serves the production build locally via Vite       |
| `npm run lint`            | Fixes lint issues in `.ts` files using ESLint      |
| `npm run lint:check`      | Checks for lint issues without fixing              |
| `npm run format`          | Formats code in `./src` using Prettier             |
| `npm run format:check`    | Checks code formatting with Prettier               |
| `npm run stylelint`       | Fixes style issues in `.css` files using Stylelint |
| `npm run stylelint:check` | Checks `.css` files for style issues               |
| `npm run test`            | Runs all unit tests using Vitest                   |
| `npm run test:coverage`   | Runs tests and generates a coverage report         |
| `npm run prepare`         | Initializes Husky for Git hooks                    |


## Team

- 💅 Ksenia Gorina / [asfound](https://github.com/asfound)
- 💅 Alena Radomskaia / [radomskaia](https://github.com/radomskaia)
- 💅 Grim / [ripetchor](https://github.com/ripetchor)
