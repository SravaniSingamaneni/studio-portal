# AaDvi Studio Portal

A front-end for an events and celebrations studio: event planning, decorations, party hosting, and an online gift shop. Built with **Angular 17** and **TypeScript**, with an **ASP.NET Core** backend on **Azure** planned next.

> **Status: work in progress.** The front-end pages below are built. Orders, payments, authentication and the backend API are on the roadmap and are not implemented yet.

## What's built so far

- **Home**: banner, "what is this portal" intro, and service cards
- **About**: story, values, and how-it-works steps
- **Services**: detailed cards for event planning, decorations, party hosting and the gift shop
- **Contact**: reactive form with validation (name, email, phone, service, date, message)
- **Sign in / Sign up**: forms with validation, including password rules and a confirm-password check (UI only, no real authentication yet)
- **Event Budget Planner**: pick decorations, food, music, games and gifts, set a guest count, and see a live cost estimate with an optional budget comparison. Prices are sample values.
- **Theme**: custom styling based on the studio's watercolor logo (blue, green, gold on cream)

## Tech stack

| Area | Technology |
|---|---|
| Framework | Angular 17 (module-based) |
| Language | TypeScript |
| Forms | Angular Reactive Forms |
| State | Angular signals (budget planner) |
| Styling | Plain CSS with CSS variables |
| IDE | Visual Studio 2022, with GitHub Copilot |

## Getting started

Requirements: Node.js 20 LTS and the Angular CLI (`npm install -g @angular/cli`).

```bash
git clone https://github.com/SravaniSingamaneni/studio-portal.git
cd studio-portal
npm install
ng serve
```

Then open the local address printed in the terminal (for example `http://localhost:62344/`).

## Project structure

```
src/app/
├── navbar/            top navigation
├── footer/
└── pages/
    ├── home/
    ├── about/
    ├── services/
    ├── contact/
    ├── sign-in/
    ├── sign-up/
    └── budget-planner/
```

## Roadmap

- [ ] Gift shop with product catalog and cart
- [ ] ASP.NET Core Web API (orders, payments, returns, order status)
- [ ] Authentication (ASP.NET Core Identity / JWT)
- [ ] Persist and track budget plans against actual spend
- [ ] Live chat (SignalR)
- [ ] Deploy to Azure
- [ ] Vue.js version of the front-end for comparison
- [ ] Real 3D imagery for the banner and service cards

## Notes
- Built as a learning and portfolio project using an AI-assisted workflow: GitHub Copilot in Visual Studio for in-editor suggestions, and Claude for architecture, code review and debugging. All code was reviewed, tested and understood before committing.

## Screenshots

Add screenshots to `docs/screenshots/` and link them here.

## License

MIT

# StudioPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
