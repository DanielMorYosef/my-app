Introduction
This project is a Card Management System designed for businesses, providing various functionalities based on user roles (visitor, regular user, business user, admin). The application allows users to manage business cards, view detailed card information, and perform CRUD operations.

Features
User authentication and role-based access control to Create,Like , View, Edit, and Delete business cards on all pages support search function (Home, MyCards, FavCards) Like and favorite cards.


Navigating through the app while-
Not Logged In: Home, About, Search, Dark Mode, Login, Registration
Logged In (Regular User): Home, About, Favorites Cards, Search, Dark Mode
Logged In (Business User):Home, About, Favorites Cards, My Cards, Search, Dark Mode
Logged In (Admin): About, Favorites Cards, My Cards, Home ,Search, Dark Mode

Card actions:

Not logged in: View phone.
Logged in (Regular User): View phone, like card.
Logged in (Business User): View phone, like card, create card, edit your own cards
Logged in (Admin): View phone, like card, delete card, edit any card and create card.

To view cards
Displays detailed information about a card by clicking the img in any card available opens a module popup.

To create a card
navigate to my card and open the Form on the bottom to create a new card.

To edit a card
click the edit icon on available cards to open a popup Form to edit an existing card. Pre-fills form with card details fetched from API.

To like a card
press the heart icon on any card and watch it fill to diffrenciate from unliked cards and see it in fav cards section

Validation and submission handling on login, signup and card creation 


About
Info about the app and card click showcasing.

FavCards
Displays a list of favorite cards.

Card actions: like (remove from favorites), view phone, delete (according to role based access).

MyCards
Displays a list of user-created cards.


Login
Form to log in.
Validation and submission handling.
Stores token in localStorage.


Registration
Form to register a new account.
Validation and submission handling.


Footer
Not Logged In: About
Logged In (Regular User): About, Favorites Cards
Logged In (Business User): About, Favorites Cards, My Cards
Logged In (Admin): About, Favorites Cards, My Cards


Dark Mode
Toggle switch to enable dark mode using useTheme custom hook


Search in navbar
Search input that filters cards displayed on the Home page

Technologies Used
Bootstrap
Material-UI (MUI)
HTML & CSS
React (useState, useEffect, useNavigate)
React Router
Axios
JWT

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
