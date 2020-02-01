Tip Pool Exercise

In this exercise you will take an existing code base and write tests using the Jasmine testing library.

‘Tip Pool’ is an application that tracks the total tips generated from a group of servers in a restaurant. It then calculates the payout for each server.

Your task is to thoroughly test each function in the app!

Step One: Complete server.test.js

Take a minute to read through the codebase, currently there is only one test in server.test.js

Notice that the string ‘Alice’ is getting left on the dom after the first test is run, this is because we didn’t tear down our tests properly

To get started:

1. Thoroughly read the code base
2. Clean up the dom after the test is run using afterEach
3. Write a test for each function found in server.js

Step Two: Test the remainder of the app

Repeat the process from step one for payments.js and helpers.js

1. Create a helpers.test.js file and test each function in helpers.js
2. Create a payments.test.js file and test each function in payments.js
3. When finished you should have three .test.js files one for each .js file

Step Three: Test your own code

Get a feel for testing your own code

First we will build out functionality for removing a server from the server table

1. Review the functionality of append(tr, value)

2. Create a appendDeleteBtn(tr), it will be similar to append(tr, value). This function will create a ‘td’ with the value ‘X’, when clicked it will delete the table row it belongs to

3. Write the functionality for appending a ‘td’ to a ‘tr’ with the value ‘X’

4. Set an click event listener on the ‘td’ that will remove the parent ‘tr’ from the dom. You will have to find a way to access the parent row of the ‘td’ from the click event

5. Write tests for appendDeleteBtn(tr)

You may notice the difficulty of simulating a click with vanilla javascript so do not spend too much time on testing the html after the DOM is updated (later we will study approaches for this with other libraries).

6. Repeat the process for removing a payment from the payment table
