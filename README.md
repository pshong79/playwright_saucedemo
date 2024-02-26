# playwright saucedemo

Playwright is one of the tools I have been playing around with the past year or so.

I figure I should get some tests created and pushed up to Github so here is my first Playwright repo. 
These tests are pretty basic. They test the end-to-end functionality of `standard_user` shopping in the `Swag Labs` store and the visual components and the "look and feel" of the site using `visual_user`.

I will be adding more tests as I work towards full coverage of this the test site https://www.saucedemo.com for `standard_user`.
These tests will only use `standard_user` and `visual_user` since both have access to perform all the functions. `standard_user` will test the primary/secondary workflows while `visual_user` will test the visual components and the "look and feel" of the page.

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

### Tests in test suite
Before and after execution of these tests, each test logs in as `standard_user` and logs out of the application, respectively.
* View product details
* Add product to the cart through the product's detail page
* Add product ot the cart through the store inventory page
* Checkout

Similarly, before and after execution of these tests, each test logs in as `visual_user` and logs out of the application, respectively.

To create your own expected snapshots, delete the files in the `visual_user.spec.js-snapshots` folder and follow the instructions in the `visual_user.spec.js` file.

All the tests in `visual_user.spec.js` file _should_ fail.
* Visual testing of inventory page
* Visual testing of all product details pages
