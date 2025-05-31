# Cybersecurity Hygiene
![Deployed](https://img.shields.io/badge/status-deployed-brightgreen)

## Who?
Developed by [Adam Sochorec](https://www.linkedin.com/in/adamsochorec) with consultation from teachers at [IBA](https://www.iba.dk) as part of a cybersecurity-oriented project in July 2022.

## Why?
As internet connectivity grows, cybersecurity is crucial for protecting sensitive data from threats like phishing and weak passwords. Many users exhibit unsafe password habits, making them vulnerable to attacks. This project highlights key cybersecurity concerns and educates users on best practices.

## When?
Initially researched and written in July 2022. Refactored in February 2025 from static HTML, CSS, and JavaScript into a Vue.js and Node.js application, following modern web development practices.

## What?
An interactive educational article designed to inform non-technical users about cybersecurity threats and how to mitigate them. The content remains introductory but includes practical solutions, interactive tools like a password generator and strength analyzer, and additional educational resources.

## How?
Originally built with static HTML, CSS, and JavaScript, later refactored into a Vue.js and Node.js application using TypeScript. It incorporates [Tailwind CSS](https://tailwindcss.com) and [PrimeVue](https://www.primevue.org) components. Animations are handled with custom LottieFiles, and password strength estimation is powered by [`zxcvbn-ts`](https://zxcvbn-ts.github.io/zxcvbn/) (developed by Dropbox).


## Project Setup
```sh
npm install ## Install Node
npm run dev ## Compile and Hot-Reload for Development
npm run build ## Type-Check, Compile and Minify for Production
```
## Project Deployment
```sh
npm run build
git add dist -f
git commit -m "adding dist"
git subtree push --prefix dist origin gh-pages
```
