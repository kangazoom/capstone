import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import {
  AudioPlayer,
  AudioRecorder,
} from 'react-native-audio-player-recorder'
import { Actions } from 'react-native-router-flux'

import FireBaseService from '../Network/FireBaseService';

// import RNFS from 'react-native-fs';
// const RNFS = require('react-native-fs');
import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios';



// import RecordButton from './RecordButton'
// import ActionButtons from './ActionButtons'
// import Button from './Button'
import Constants from './Constants';

class RecorderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      isFinishRecorded: false,
      isPaused: false,
      currentTime: 0,
      audioLength: 0
    }
    this.timer = null
  }

  prepareRecordingPath() {
    console.log(Constants.AUDIO_PATH)
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
      // IncludeBase64: true,
    })
  }

  record = () => {

    this.prepareRecordingPath()
    AudioRecorder.startRecording()
    console.log('recording')
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    })

    this.timer = setInterval(() => {
      const time = this.state.currentTime + 1
      this.setState({ currentTime: time })
      if (time === Constants.MAX_AUDIO_LENGTH) {
        this.stopRecording()
      }
    }, 1000)
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return

    AudioRecorder.stopRecording()
    console.log('stopped')
    this.setState({ audioLength: this.state.currentTime + 1 })
    clearInterval(this.timer)
    this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0 })
  }

  encodeAudio = () => {
    // let Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    // let encodedString = Base64.encode(Constants.AUDIO_PATH);
    // return encodedString

    // console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
    // console.log(RNFetchBlob)
    //     const Buffer = require("buffer").Buffer;
    // let encodedAuth = new Buffer("your text").toString("base64");
    // console.log(Buffer)
    console.log('k in encoding land')
    const filepath = Constants.AUDIO_PATH;
    const encoding = 'base64'
    RNFetchBlob.fs.readFile(filepath, encoding)
      .then((data) => {
        console.log('encoding successful')
        // console.log(data)

        if (data) {
        FireBaseService.initializeService()
        FireBaseService.addEncodedAudio(data)
        
        return 'yay encoded data'
        }

      })
      .catch((err) => {
        console.log('no encoding')
        return 'error'
      })

    // add the encoded data into firestore
            
    // axios.get('https://us-central1-run-lines.cloudfunctions.net/googleSpeechRequest')
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch(function ((error) => {
    //   console.log(error);
    // });

  }    

  tryFunctions = () => {
    let URL = "https://us-central1-run-lines.cloudfunctions.net/googleSpeechRequest"
  //   let audio = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  //   let config = {
  //     "encoding": "FLAC",
  //     "sampleRateHertz": 22050,
  //     "languageCode": "en-US",
  // }
  //   let data = {
  //     "audio": audio,
  //     "config": config,
  // }

    axios.get(URL)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      console.log('NO FUNCIONS FOR YOU')
      console.log(error)
      return error
    }
    )

  }



  render() {
    const {
      isRecording,
      isFinishRecorded,
    } = this.state

    if (this.state.audioLength > 0 && this.state.isFinishRecorded === true) {
      console.log('we are in the encoding audio if/else')
      this.encodeAudio()
    }

  
    console.log(this.state.audioLength)
    console.log(this.state.isFinishRecorded)


  console.log(AudioRecorder)

  return(
      <View>
  <Button
    title='rec'
    isRecording={isRecording}
    isFinishRecorded={isFinishRecorded}
    onPress={this.record} />
{/* <RecordButton></RecordButton> */ }


<Button
  title="stop rec"
  isFinishRecorded={isFinishRecorded}
  isRecording={isRecording}
  // playPauseHandler={playPauseHandler}
  onPress={this.stopRecording} />

  {/* <Text>{JSON.stringify(this.tryFunctions())}</Text> */}


{/* <ActionButtons 
          isFinishRecorded={isFinishRecorded} 
          isRecording={isRecording}
          playPauseIcon={playPauseIcon}
          playPauseHandler={playPauseHandler}
          stopRecording={this.stopRecording} />*/}
        
      </View >
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Constants.PLATFORM_MARGIN_TOP + 26,
//     flex: 1,
//   },
//   content: {
//     alignItems: 'center'
//   },
// })

export default RecorderContainer;