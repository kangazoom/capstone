// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// exports.fireStoreAudioTrigger = functions.firestore
//     .document('encoded_audio/{docAudioID}')
//     .onCreate((snapshot, context) => {

//         const newDocData = snapshot.data()
//         const encodedAudio = newDocData.encoded_data
//         return encodedAudio

//         // ABOVE: link to google speech api request, figure out promises


//       })


exports.googleSpeechRequest = functions.https.onRequest((request, response) => {
    // response.send("Hello from Firebase!");
// exports.googleSpeechRequest = function(request, response) {
//     let responseBody = {};
//     console.log('im in a function wow')
//     console.log(request)
//         // function main() {

//         return new Promise((resolve, reject) => {
//         // Imports the Google Cloud client library
        // const speech = require('@google-cloud/speech');

        

//         // Creates a client
//         const client = new speech.SpeechClient();

//         // The audio file's encoding, sample rate in hertz, and BCP-47 language code
//         const audio = {
//             content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//         };
//         const config = {
//             encoding: 'FLAAC',
//             sampleRateHertz: 22050,
//             languageCode: 'en-US',
//         };
//         const data = {
//             audio: request.audio,
//             config: request.config,
//         };

//         // Detects speech in the audio file
//         const [response] = client.recognize(data);
//         const transcription = response.results
//             .map(result => result.alternatives[0].transcript)
//             .join('\n');
//         console.log(`Transcription: ${transcription}`);
//         if (transcription){
//         response.status(200).send(transcription);
//         return resolve(transcription)
//         }
//         else {
//             console.log('did not connect w googz')
//             response.status(400).send(error);
//             return reject(error)
//         }
// // }
//     });
// });


///////////////////////////////
      
// Declare the API clients as global variables to allow them to initiaze at cold start.
const speechToTextClient = getSpeechToTextClient();

// exports.speechTranslate = (request, response) => {
  let responseBody = {};

  const datar = {
    config: {
      encoding: "FLAAC",
      sampleRateHertz: 22050,
      languageCode: "en-US",
    },
    audio: {content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
  };


    //   return callSpeechToText(
    //     inputAudioContent,
    //     inputEncoding,
    //     inputSampleRateHertz,
    //     inputLanguageCode
    //   );
    speechToTextClient.recognize(datar)
    .then(data => {
      const sttResponse = data[0];
      // The data object contains one or more recognition alternatives ordered by accuracy.
      const transcription = sttResponse.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      responseBody.transcription = transcription;
      return response.status(200).send(responseBody);
      })
    .catch(error => {
      console.error(error);
      return response.status(400).send(error.message);
    });

})
