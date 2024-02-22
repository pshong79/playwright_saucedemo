# playwright saucedemo

Playwright is one of the tools I have been playing around with the past year or so.

I figure I should get some tests created and pushed up to Github so here is my first Playwright repo. I will eventually be adding more tests as I work towards full coverage of this the test site https://www.saucedemo.com.


## Running the tests
To run the tests, you will need to install NodeJS. 
Once NodeJS is installed, install Playwright using `npm`:
```
$ npm init playwright@latest
```
A more detailed instructions installing Playwright can be found here: https://playwright.dev/docs/intro

Once Playwright is installed, clone the repository.

To run the tests in the suite, in console, execute the following command:
```
$ npx playwright test
```
These tests are, currently, only configured to run in Chrome; however, the project can be configured to execute the tests in Chrome, Firefox, and/or Safari.

## View test run report
The report of the latest run can be viewed with:
```
$ npx playwright show-report
```
This will generate the report in HTML format in the browser.
