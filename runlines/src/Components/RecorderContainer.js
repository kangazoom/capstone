import React, { Component } from 'react'
// import {AudioRecorder, AudioUtils} from 'react-native-audio';


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
import GoogleSpeechService from '../Network/GoogleSpeechService';

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
      audioLength: 0,

    }
    this.timer = null
  }

  componentDidMount() {
    this.prepareRecordingPath()
  }

  prepareRecordingPath() {
    console.log(Constants.AUDIO_PATH)
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 16000,
      Channels: 1,
      AudioQuality: 'high',
      AudioEncoding: 'ulaw',
      // AudioEncodingBitRate: 32000,
      // IncludeBase64: true,
    })
  }

  record = () => {
    console.log('recording')
    this.setState({
      isPlaying: false,
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    }, () => {
      AudioRecorder.startRecording()
      this.timer = setInterval(() => {
        const time = this.state.currentTime + 1
        this.setState({ currentTime: time })
        if (time === Constants.MAX_AUDIO_LENGTH) {
          this.stopRecording()
        }
      }, 1000)
    })
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return
    const me = this;
    AudioRecorder.stopRecording()
    console.log('stopped')
    this.setState({ audioLength: this.state.currentTime + 1, isRecording: false, }, () => {
      if (me.state.audioLength > 0) {
        console.log('we are in the encoding audio if/else')
        clearInterval(this.timer);
        me.encodeAudio()
        .then((response) => {
          // me.clearInterval(me.timer)
          me.setState({ isFinishRecorded: true, currentTime: 0 }, ()  => {
            console.log(`TEARS OF JOY q_q`)
            Promise.resolve(response)
          }) 
        })
      .catch((error) => {
        console.log(`Inside the stopRecording Function: ${error}`)
        Promise.reject(error)
      })
      }
    })

  }

  encodeAudio = () => {
    console.log('k in encoding land')
    const filepath = Constants.AUDIO_PATH;
    const encoding = 'base64'
    console.log(filepath)
    console.log(encoding)
    return RNFetchBlob.fs.readFile(filepath, encoding)
      .then((data) => {
        console.log(typeof data)
        if(!data) { return Promise.reject('We got not data from readFile') }
        console.log('encoding successful')
        return GoogleSpeechService.discover(data);
    }).then((transcript) => {
      console.log(JSON.stringify(transcript));
      this.returnedTranscriptionResponse(transcript)
      return Promise.resolve('yay encoded data')
    })
      .catch((err) => {
        console.log(`no encoding ${err}`)
        console.log(this.sendTranscript)
        return Promise.reject('error')
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

  returnedTranscriptionResponse = (transcription) => {
    this.props.returnedTranscriptionResponseCB(transcription)
  }

  render() {
    const {
      isRecording,
    } = this.state
    console.log('render called, is recording is ' + isRecording);
  return(
      <View>
        <Button
          title='RECORD'
          disabled={isRecording}
          onPress={this.record}
        />
{/* <RecordButton></RecordButton> */ }
        <Text>{this.state.currentTime}</Text>

        <Button
          title="STOP"
          disabled={!isRecording}
          onPress={this.stopRecording}
        />

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