# Cybersecurity Hygiene
Essential Steps Leading to Your Secure and Healthy Online Presence.

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
