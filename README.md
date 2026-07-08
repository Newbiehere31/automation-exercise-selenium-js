# Automation Exercise Selenium JavaScript Tests

End-to-end tests for [Automation Exercise](https://automationexercise.com/) using Selenium WebDriver, JavaScript, Chrome, and Mocha.

## What Is Tested

- Home page opens and navigation is visible
- Products page opens
- Login and signup forms are visible
- Signup creates a new account with a fresh Gmail plus-address
- Invalid login shows an error
- Valid login works after logout
- Product search opens matching results and product details
- Cart flow adds a product and verifies the cart row
- Contact form submits successfully

This project does not delete accounts after tests.

## Run On This Machine

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

Failure reporting was verified with an intentional temporary failure.

## Project Structure

```text
.
|-- scripts/
|   `-- run-tests.js
|-- tests/
|   |-- auth.test.js
|   |-- cart.test.js
|   |-- contact.test.js
|   |-- home.test.js
|   |-- login.test.js
|   |-- products.test.js
|   |-- signup.test.js
|   `-- support/
|-- package.json
`-- run-tests.cmd
```
