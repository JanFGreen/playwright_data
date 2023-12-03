# Tests exercises for GAD application

## GAD Application

Repository: https://github.com/jaktestowac/gad-gui-api-demo

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- copy application main URL as value of `BASE_URL` variable in `playwright.config.ts` file

## Use

Run all tests:

```
npx playwright test
```

For more usage cases look in `package.json` scripts section.
