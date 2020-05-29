# Assessment: React Madlibs

## Part 1: Conceptual

Answer the following questions inside the conceptual.md file.

## Part 2: addCommas

Write a function called addCommas which accepts a number and converts it into a string formatted with commas added for readability.

Examples of the output we’d like:

    Input	Expected Output
    1234	“1,234”
    1000000	“1,000,000”
    9876543210	“9,876,543,210”
    6	“6”
    -10	“-10”
    -5678	“-5,678”
    (bonus) 12345.678	“12,345.678”
    (bonus) -3141592.65	“-3,141,592.65”

Write tests for these (non-bonus) cases and make sure your code passes these. Feel free to add any other tests you deem necessary.

## Part 3: React MadLibs

Make a Madlibs game in React!

As you can see, you’ll need a form for your Madlib, which, once submitted, shows the story with the form entries inserted. Note that the GIF also includes the bonus features described below.

You should have a top-level Madlib component, but beyond that the component hierarchy is up to you. Diagram out the hierarchy for yourself before you write any code! Please do not use a single React component.

Document your code appropriately.

### Bonus

- Improve the code so you can’t submit the form of prompts unless each one is filled out.
- Add a “Restart” button to the story, which restarts which goes back to the form prompting for answers.

### Super Bonus

- Allow the user to select between several story options before filling out their Madlib form.
