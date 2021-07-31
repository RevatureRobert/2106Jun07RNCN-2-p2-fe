<h1><img src ="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/339c19c006bcdfbe6a9ec45d644dc6422bc647e0/src/assets/chirperLogo.png" alt="Chirper" width="350"></h1>

![Written in React Native](https://img.shields.io/badge/LANGUAGE-REACT%20NATIVE%20%28TYPESCRIPT%29-blue?style=for-the-badge&logo=react)
![Managed by Expo](https://img.shields.io/badge/MANAGED%20BY-EXPO-purple?style=for-the-badge&logo=expo)
![CI/CD by AWS CodePipeline](https://img.shields.io/badge/CI%2FCD-CODEPIPELINE-orange?style=for-the-badge&logo=amazonaws)

![Works on Web](https://img.shields.io/badge/DEVELOPED%20FOR-WEB-black?style=for-the-badge&logo=safari)
![Works on iOS](https://img.shields.io/cocoapods/p/ios?label=DEVELOPED%20FOR&logo=APPLE&style=for-the-badge)
![Works on Android](https://img.shields.io/badge/DEVELOPED%20FOR-ANDROID-green?style=for-the-badge&logo=android)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=ncloc)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=bugs)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=code_smells)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=sqale_index)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=alert_status)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=RevatureRobert_2106Jun07RNCN-2-p2-fe&metric=security_rating)](https://sonarcloud.io/dashboard?id=RevatureRobert_2106Jun07RNCN-2-p2-fe)

**NOTE**: This repo only contains the front-end of our project. The API used can be found at [RevatureRobert/2106Jun07RNCN-2-p2-be](https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-be).

## Project Description

The front end for Chirper, a social media application for registered users to post "Chirps" as well as like and reply to other users' Chirps. The application can be run as a mobile app (iOS or Android) or as a web application.

This project is written in React Native intialized with Expo, written with unit tests using Jest and Enzyme.

## Technologies Used

- React Native in TypeScript
- React Redux
- Expo
- Jest (w/ Enzyme)
- AWS S3
- AWS CodePipeline
- AWS Cognito

## Features

- Users can signup and validate their own emails
- Users can login
- Users can logout of the application when finished
- Users can post new chirps
- Users can include photos in chirps
- Users can view all existing chirps
- Users can view all chirps by a single user
- Users can like chirps
- Users can comment on chirps
- Users can set their bio
- Users can change profile pictures
- Users can see others' bios
- Users can delete their chirps, comments, and accounts

To-do list:

- Users should be able to upload videos to chirps
- Users should be able to enter age/birthday
- Users should be able to have a separate display name from their username
- Users should be able to follow other users specifically instead of following all

## Getting Started

To Run (assume all links are case-sensitive; links may not work after 20 August 2021):

- There is currently no way to run this app on iOS for those not on the development team
- A web version is available (as a beta) at https://bit.ly/Chirper
- On Android, there are two ways to get our app
  - Download the `Expo` app from the Play Store and do ONE of the following
    - Go to https://expo.dev/@marcski55/React-Native-chirper on a different device and scan the QR code with your Android camera
    - Paste `exp://exp.host/@marcski55/React-Native-chirper` into the Tools category
  - Sideload an APK
    - Using an emulator
      - Download the APK from https://bit.ly/chirperAPK
      - Download and install Android Studio from https://developer.android.com/studio
      - Create a blank project or open an existing one
      - Open the AVD (Android Virtual Device) Manager using the icon at the top right or selecting it from the `Tools` menu
      - Open a virtual device
        - If there are none, one can be created using the botton on the bottom left
          - The Pixel 3a would be a good template device
          - Make sure to select an `R` release (shown in the left column)
          - Accept all defaults
      - Drag the APK from your Downloads folder (or wherever you saved it) onto the Emulator screen
        - It will begin the install process automatically; follow any instructions on screen
    - Using a physical device _(not recommended as it requires sideloading)_
      - Enable sideloading if you haven't already
        - Go to `Apps & notifications → Advanced → Special App Access → Install unknown apps`
        - Select your browser (probably Chrome)
      - Download the APK https://bit.ly/chriperAPK
      - Install the app following the prompts on your screen

To Develop:

- Make sure you have NodeJS installed.
- Clone the repo: `git clone https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-fe path-to-local-folder`.
- Enter the directory of your folder on your terminal: `cd path-to-local-folder`.
- Run `npm install` to get dependencies installed.
  You may need to add the `--legacy-peer-deps` flag.
- Run `expo start` to run the app in development mode. (This should NOT be used for deployment.)

To Deploy:

- Sign up for an Expo account if you don't already have one.
- Then run the appropriate command:
  - `expo build:web`
  - `expo build:android -t apk --no-wait`
- iOS should also be able to be build but we don't have Apple Developer licenses.
- Android build will be on expo's site (URL will be given once you run the command).

## Usage

- Create a new user. Login using new username and password after verifying your email.
<p align="center">
<img alt="Signup Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.30.56.png" height="500" />
<img alt="Login Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.32.04.png" height="500" />
</p>

- View chirps on the home screen.
Post a new chirp by using the floating "Add Chirp" (pencil) button.
<p align="center">
<img alt="Main Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.32.56.png" height="500" />
<img alt="Add Chirp Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.33.33.png" height="500" />
</p>

- View a single user's chirps by tapping their profile pic.
<p align="center">
<img alt="Profile Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2013.35.02.png" height="500" />
</p>

- Reply to a chirp by tapping a chirp.
<p align="center">
<img alt="Single Chirp Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.36.45.png" height="500" />
</p>

- Search by username or chirp with the magnifying glass.
<p align="center">
<img alt="Search Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.33.03.png" height="500" />
<img alt="Search Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.33.09.png" height="500" />
</p>

- See all your chirps or logout by tapping the profile icon.
<p align="center">
<img alt="Profile Screen w/ Logout" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2013.45.11.png" height="500" />
</p>

- Change your profile pic, bio, or delete your account on the settings screen.
<p align="center">
<img alt="Settings Screen" src="https://raw.githubusercontent.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/main/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202021-07-28%20at%2012.33.21.png" height="500" />
</p>

## Contributors

- [Daguinson Fleurantin](https://github.com/dague00)
- [Red Oral](https://github.com/redoral)
- [Marc Skwarczynski](https://github.com/marcski55)
- [Caleb Sword](https://github.com/calebmsword)

## License

[![MIT](https://img.shields.io/github/license/RevatureRobert/2106Jun07RNCN-2-p2-fe?style=for-the-badge)](https://github.com/RevatureRobert/2106Jun07RNCN-2-p2-fe/blob/1367e28ae4fb68562872aec65e60a1a4b100454a/LICENSE.txt)

![Built with Love](https://forthebadge.com/images/badges/built-with-love.svg)
