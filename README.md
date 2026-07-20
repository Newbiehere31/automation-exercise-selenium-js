# Automation Exercise Selenium JavaScript Tests

End-to-end tests for [Automation Exercise](https://automationexercise.com/) using Selenium WebDriver, JavaScript, Chrome, and Mocha.

## What Is Tested

- Home page title and main navigation
- Products page navigation
- Test Cases page navigation
- Footer subscription success message
- Login and signup form visibility
- Login form CSRF protection and credential entry
- Signup form CSRF protection and identity entry
- Login/signup form isolation
- Product search and product detail verification
- Add product to cart and verify cart contents
- Add product with custom quantity from product details
- Remove product from cart
- Contact form submission and return-home flow

This project does not delete accounts after tests.

Note: the public Automation Exercise auth POST endpoints currently return a live-site `403 CSRF verification failed` response to automated login/signup submissions. The active suite avoids fake auth success and verifies the forms without submitting them.

## Run On This Machine

Use these Windows helpers if `pnpm` is not available from your normal terminal:

```bat
run-tests.cmd
```

To watch Chrome run visibly:

```bat
run-headed.cmd
```

## Run With pnpm

```bash
pnpm install
pnpm test
pnpm test:headed
```

## Reports

The final HTML report is created here:

```text
selenium-report/index.html
```

The HTML report includes totals, per-test durations, and failure details. If a test fails, the report shows:

- error message
- stack trace
- failed test name

Failure reporting was verified earlier with an intentional temporary failure.

## Project Structure

```text
.
|-- scripts/
|   `-- run-tests.js
|-- tests/
|   |-- pages/
|   |   |-- auth-page.js
|   |   |-- cart-page.js
|   |   |-- contact-page.js
|   |   |-- home-page.js
|   |   `-- products-page.js
|   |-- support/
|   |   |-- actions.js
|   |   |-- driver.js
|   |   `-- test-data.js
|   |-- auth.test.js
|   |-- cart.test.js
|   |-- contact.test.js
|   |-- home.test.js
|   |-- login.test.js
|   |-- products.test.js
|   `-- signup.test.js
|-- package.json
|-- run-headed.cmd
`-- run-tests.cmd
```

## Design Notes

- `tests/pages/*` keeps selectors and page actions out of spec files.
- `tests/support/actions.js` contains low-level Selenium actions and waits.
- `tests/support/driver.js` creates Chrome sessions and blocks common third-party ad/analytics hosts.
- `tests/support/test-data.js` creates unique account-style form data for auth tests.
