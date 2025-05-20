# MathDrill

A Vue.js application for interactive math worksheets.

## Project Overview

MathDrill is an interactive web application that displays math worksheets for students to practice their skills. The current implementation includes a "Rounding Off to Nearest 10" worksheet.

## Features

- Display of math worksheet with questions and multiple-choice answers
- Interactive answer selection
- Name input field
- Score calculation
- Reset functionality
- Responsive design for various devices

## Technology Stack

- Vue 3.5
- TypeScript
- HTML/CSS
- JavaScript
- Vite (for development and building)

## Deployment

This project is configured for deployment on Vercel.

## License

The worksheet content is copyrighted by www.mathinenglish.com.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
