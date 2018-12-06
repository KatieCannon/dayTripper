# dayTripper-app

dayTripper is a cross-platform mobile app for tourists wanting to plan a day out. A user can set up a profile, specifying their interests (e.g. nature, music, shopping).

Then, when they give the app a destination city, it will generate suggestions of tourist spots to visit which are tailored to their interests. The user can view these suggestions on a map, which will give them a description of the location, and plot out a route to it starting from their current location.
This repo contains the front-end of the app which has been made using React Native.

It builds on our back end API, which is a RESTful api written using the serverless framework and Amazon Web Services (API gateway, Lambda, DynamoDB, S3 Cloudformation). The dayTripper API can be found at the following repo:
[Back-end repo](https://github.com/ac27182/daytripper-api)

## User Stories

Users can sign up and create an account and set preferences which are saved to the account.
Users can login with a username.
Users can view and update their account details/preferences.
Users can plan a trip by stating a city to visit.
Users can select an itinerary from a set of generated popular attractions in the city that have been filtered according to user preferences.
Users can reset the itinerary and generate new choices if required by clicking the 'Randomize' option.
Users can save the itinerary by clicking the 'save map' option.
Users can view their itinerary on a live map.
Users can see their current position on the map.
Users can select a destination by tapping on a pin on the map which will show a callout providing the user with information about the destination.
Users can navigate to the destination by clicking on the destination name link inside the callout. This will provide a mapped route to the destination.
Users can see the distance to the destination on the map as they move towards it.
Users can view the map from top down or as a street view.
Users can check in at their destination when they are within 50 metres of the location. This changes the marker colour to denote visited locations.

## Getting Started

Installing
Fork this repository to your own GitHub account
Clone it to your local machine and cd into it:

```bash
$git clone <fork url>$ cd dayTripper-app
```

Install all package dependencies:

```bash
$npm install
```

The dependencies that will install are:
@mapbox/polyline: ^1.0.0,
expo: ^31.0.2,
geolib: ^2.0.24,
react: 16.5.0,
react-native: https://github.com/expo/react-native/archive/sdk-31.0.0.tar.gz,
react-native-elements: ^0.19.1,
react-native-indicators: ^0.13.0,
react-native-maps: ^0.22.1,
react-native-maps-directions: ^1.6.0,
react-native-spinkit: ^1.1.1,
react-navigation: ^3.0.0

## Development

Once everything is installed, you can run the app locally in your chosen environment:

```bash
$ npm start
```

This will start up the development server and it will open a new browser tab which will compile the project and provide a QR code for use on mobile devices.(Expo app will need to be installed for this.) Alternatively the app can be run using one of the available simulators provided, e.g. Apple's XCode, or for android development, Android Studio.

To navigate around the app on your device will require a user login. To view the app without creating a new user in the first instance, input the test username of `williamwalkers` on the login page.

## Routes to the backend API:

endpoints:
GET - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/apiCall
GET - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/getUser
PATCH - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/updateUserProfile
PATCH - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/updateJourneyHistory
POST - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/createUser
DELETE - https://xxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/deleteUser

## Tech Stack

Javascript, Node.js React Native, React Native Elements, React Native Calendars, React Native Maps, React Navigation, Expo, Google Directions API, Polyline, Geolib.

## Authors:

Pete Fletcher, Katie Cannon, Hannah Reeson, Rachel Griffiths, Alex Cameron, Julian Beighton-Dykes.

## Acknowledgements

All of the team at Northcoders.
