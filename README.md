# Renato Aircraft Scheduling

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to set up the project

First you need to install the necessary dependecies, make sure you have [node](https://nodejs.org/en/) installed.
Then in the project directory, run:

### `npm install`

To run the project in development mode, simply run:

### `npm start`

Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Development mode will keep a node server running, the page will reload if you make any edits to files in the src folder.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Challenge Considerations

For the challenge, a couple of "assumptions" were made and this section will explain those decisions.

### Midnight Rule

As no time was specified for the "All aircrafts should be on the ground at midnight" rule, the system calculates one turnaround time before midnight and one after, meaning each aircraft is at least unavailable for 40 minutes of the day.

### Flights Pagination

For some reason the API provided was not applying pagination as described in the challenge. To make the UI more user-friendly I've created the pagination in the UI. That logic can be easily removed and the overall component will be simplified once the logic is moved to the backend.

### Remove Flight from Rotation

To simplify the User flow, the system only allows to remove one Flight at a time from the rotation (the last Flight). This User flow was adopted so the system can effectively suggest only flights that depart from the last flight's location and has a departure time greater than the last flight in the rotation.

### Aircraft Usage Definition

To satisfy the requirement "Optimise the utilisation by seeing clearly if and when the selected aircraft is under-used." the system will show the Aircraft Usage percentage coloured in red in case the usage is bellow 20%. That number was arbitrarily chosen as no definition of underusage was provided in the challenge.

### System won't avoid duplicated Rotations for Different Aircrafts

As it wasn't marked as a requirement, the system will allow the user to select the exact same flights for different Aircrafts.