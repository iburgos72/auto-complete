# Auto-Complete

## Run the project

#### Install dependencies

```bash
yarn install
```



#### Run the project
    
```bash
`yarn start`
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### Run the unit test
```bash
yarn test
```

Launches the test runner in the interactive watch mode.


## About the solution

#### Auto-complete

A list of Pokémon is fetched from the Pokemon API; When the user starts typing in the input field, the list of possible options will be displayed bellow the input text. \
The user can select one of the options by clicking on it, then it triggers an `alert()` which is replacing a redirect. A redirect is not implemented since the task is focus on creating an autocomplete\
if the user presses clicks on the `Search` button, it will filter the list of possibles Pokemon that match with the typed text.

#### UX

- why not using `<select>/<option>`?\
Those HTML tags are not very flexible, and it is not possible to style them properly.
when users type while searching an option, they cannot see the text they already put,
and only one option is focused instead of showing all the possible matches.\
Having an input field with a list of options gives more flexible to edit the functionality and the style. 


- why clicking on the `Search` button does not trigger the same action as clicking on an option?\
the use case of the `Search` button is to filter the list of options by text, and I would like to minimize the number of actions (clicks in this case), if the user already found the element he/she was looking for, it should be able to select it without clicking on the `Search` button and trigger the expected action


- Move with the arrow keys and search/select with `Enter/Return`\
I tried to implement a similar functionality as the one the user have with `select/option`, in which users are able to ove with arrow keys and select with `Enter/Return` key. this way they can navigate through the list of options without using the mouse.


- why the input doesn't display the options once the user starts to type?\
Depending on the number of options, the performance of the app might be affected, so I decided to display the options only when the user typed more than 3 characters.


- What could be improved?\
I think the auto-complete could have a sections called `Recent searches` in which the user can see the last 5 searches using a LRU structure.
  This way the user can have quick access to the last searches and avoid typing the same text again.
