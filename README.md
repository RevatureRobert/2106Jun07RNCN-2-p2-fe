# 2106Jun07RNCN-2-p2-fe

### Team 2's Project 2 Front End (React Native)

The front end for Chirper, a social media site for registered users to post "Chirps" as well as like and reply to other user's Chirps. Users can follow other users so that they only see Chirps from users they follow. The application can be run as a mobile app (iOS or Android) or as a web application.

This project is written in React Native intialized with Expo, written with unit tests using Jest and Enzyme.

### New features

The environment variable ```ALERT``` was introduced. By checkings the scripts property in ```package.json```, you can see that two new scripts were added:
- ```npm run start-v```
- ```npm run test-v```

Typing these commands executes the code in "verbose" mode, in which ALERT is set to ```on``` (accessed in the code by ```process.env.ALERT```). When ALERT is "on", the method  ```alert``` prints to console for debugging. This allows us to use the functionality of console.log without inducing requiring us to comment out or remove code after we finishing debugging. The alert() method is defined in ```src/shared/functions.ts```.

When executing ```npm start``` or ```npm test```, any alert method has no effect. This functionality works using the ```cross-env``` module, so make sure to run npm install before trying to run any code.
