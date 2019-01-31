## What is this app?
This mobile app was created during [Ada Developer Academy's](https://www.adadevelopersacademy.org/) month-long capstone project, in which each student created a project using at least three new self-taught technologies. This app uses the Google Speech-to-Text API to help actors memorize scenes. Users record their memorized line after viewing a cue line. The app will then display the actual text from the scene as well as a transcript of the recording, with missed and extra words highlighed.

### Motivation
Other mobile apps allow the actor to record and listen to their and other characters’ lines, but none tell the actor when they miss a word or flub a line.

### Screenshots
![Adding a new scene](https://raw.githubusercontent.com/kangazoom/capstone/imgs/runlines/readme_assets/mc-capstone-1.gif "Adding a new scene")
[Video Version](https://vimeo.com/313458103)
![Reciting a line without any mistakes](https://raw.githubusercontent.com/kangazoom/capstone/imgs/runlines/readme_assets/mc-capstone-2.gif "Reciting a line without any mistakes")
[Video Version, with audio](https://vimeo.com/313458088)
![Reciting a line with both missed and extra words](https://raw.githubusercontent.com/kangazoom/capstone/imgs/runlines/readme_assets/mc-capstone-3.gif "Reciting a line with both missed and extra words")
[Video Version, with audio](https://vimeo.com/313458115)

### Setup
#### Technologies
- [Node.js 11.1.0](https://nodejs.org/en/) with [dependency manager npm 6.5.0](https://www.npmjs.com/get-npm)
- [React Native 0.57.8 (Building Projects with Native Code: iOS) with CLI 2.0.1](https://facebook.github.io/react-native/docs/getting-started.html)
- [Xcode 10.1](https://developer.apple.com/xcode/)
- Firebase + Firestore (see installation instructions below)
- Google Cloud Speech API (see installation instructions below)

#### Dependencies
- axios _(API requests)_
- react _(front-end library)_
- react-native _(mobile library)_
- react-native-audio-player-recorder _(audio recorder)_
- react-native-fetch-blob _(audio file Base64 encoder)_
- react-native-firebase _(cloud data store)_
- react-native-multiple-select _(versatile drop-down menu library)_
- react-native-router-flux _(app navigation)_
- react-native-vector-icons _(extensive vector icon library)_

#### Installation + Launch instructions
1. Fork and clone this repository
2. `cd` into the runlines/ directory
3. Obtain a GoogleService-Info.plist file and (if needed) cocoapods functionality by adding Firebase to the project [here](https://firebase.google.com/docs/ios/setup)
4. Add Firestore to your project [here](https://firebase.google.com/docs/firestore/quickstart)
5. Run `npm install` to install dependencies
6. `cd` into the ios/ directory and run `pod install` to install cocoapod dependencies
7. Set up a Google Speech project in the Google Cloud console, with service key [here](https://cloud.google.com/speech-to-text/docs/)
8. Set up a new API authentication key, with (at minimum) API restrictions limited to Google Cloud Speech API [here](https://cloud.google.com/docs/authentication/api-keys)
9. Add a keys.json file to the runlines/ directory. Add the following text to the file, inserting your API key from the previous step where it says ENTER_YOUR_KEY:
```
{GCS_API_KEY: "ENTER_YOUR_KEY"}
```
10. Run `npm start` to launch the packager
11. Wait for the Xcode iOS Simulator to launch the app

### Troubleshooting
If the build fails, try uninstalling and reinstalling dependendencies:
1. `cd` into the runlines/ directory
2. run `rm -rf node_modules/ && rm package-lock.json`
3. run `npm install`
4. run `react-native link` 
5. If any messages from the previous step mention that a library was already linked, then run `react-native unlink LIBRARY_NAME` and replace LIBRARY_NAME with the name of the library from the message
6. If you ran the previous step and unlinked libraries, then re-run `react-native link`
7. `cd` into ios/ directory and run `rm -rf pods/ && rm Podfile.lock`
8. run `pod install`
9. run `pod repo update`

### TODO
- Future features I would love to implement [here](https://github.com/kangazoom/capstone/blob/imgs/runlines/readme_assets/todo.md)

### Thank You
Special thanks to:
- Ada Developers Academy, especially my instructors Dee and Dan
- Brian Ledbetter

### License
[MIT License](https://github.com/kangazoom/capstone/blob/master/LICENSE)





