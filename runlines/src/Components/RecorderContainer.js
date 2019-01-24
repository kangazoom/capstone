import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { AudioRecorder } from 'react-native-audio-player-recorder'
import Icon from 'react-native-vector-icons/Foundation'

import GoogleSpeechService from '../Network/GoogleSpeechService';
import RNFetchBlob from 'react-native-fetch-blob'

import ErrorOverlay from './Common/ErrorOverlay';
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
      isVisible: false,
      statusMessage: null,
      isLoading: false,
    }

    this.timer = null
  }

  componentDidMount() {
    this.prepareRecordingPath()
  }

  prepareRecordingPath() {
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 16000,
      Channels: 1,
      AudioQuality: 'high',
      AudioEncoding: 'ulaw',
    })
  }

  record = () => {
    const me = this;
    this.setState({
      isRecording: true,
      isFinishRecorded: false,
      audioLength: 0,
      currentTime: 0
    }, () => {
      AudioRecorder.startRecording()
      this.timer = setInterval(() => {
        const time = this.state.currentTime + 1
        me.setState({ currentTime: time })
        if (time === Constants.MAX_AUDIO_LENGTH - 1) {
          me.stopRecording()
        }
      }, 1000)
    })
  }

  stopRecording = () => {
    const { isRecording } = this.state
    if (!isRecording) return
    const me = this;
    AudioRecorder.stopRecording()
    this.setState({
      audioLength: this.state.currentTime + 1,
      isRecording: false,
      isLoading: true,
    }, () => {
      if (me.state.audioLength > 0) {
        clearInterval(this.timer);
        me.encodeAudio()
          .then((response) => {
          })
          .catch((error) => {
            this.setState({
              isVisible: true,
              statusMessage: error
            })
          })
          .finally(() => {
            me.setState({
              isFinishRecorded: true,
              currentTime: 0,
              isLoading: false
            });
          })
      }
    })
  }

  encodeAudio = () => {
    const filepath = Constants.AUDIO_PATH;
    const encoding = 'base64'
    return RNFetchBlob.fs.readFile(filepath, encoding)
      .then((data) => {
        if (!data) { return Promise.reject('We got not data from readFile') }
        let phrases = this.props.phrases
        return GoogleSpeechService.discover(data, phrases);
      }).then((transcript) => {
        this.returnedTranscriptionResponse(transcript)
        return Promise.resolve('yay encoded data')
      })
      .catch((error) => {
        this.setState({
          isVisible: true,
          statusMessage: error
        })
        return Promise.reject('error')
      })

  }

  returnedTranscriptionResponse = (transcription) => {
    if (transcription !== {} && transcription !== null) {
      this.setState({
        statusMessage: "success!",
      })
    }
    else {
      this.setState({
        isVisible: true,
        statusMessage: 'You did not record any spoken words. Google did not understand you!',
      })
    }
    this.props.returnedTranscriptionResponseCB(transcription)
  }

  render() {
    const {
      isRecording,
      isVisible,
      statusMessage,
      isLoading
    } = this.state

    let displayErrorMessage = statusMessage !== 'success!' ? `Encountered an error: ${statusMessage}` : ""

    const recordIcon = (<Icon name="record" size={90} color="#FF5151" />)
    const stopIcon = (<Icon name="stop" size={90} color="#FF5151" />)

    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
        {isLoading &&
          <View>
            <Text>Fetching results...</Text>
            <ActivityIndicator size="large" color="#00D0FF" />
          </View>}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

          {isLoading === false && isRecording === false &&
            <TouchableOpacity
              onPress={this.record}
              accessible={true}
              accessibilityLabel="Record"
            >
              {recordIcon}
            </TouchableOpacity>}

          {!isLoading && isRecording &&
            <TouchableOpacity
              disabled={this.state.currentTime < 1}
              onPress={this.stopRecording}
              accessible={true}
              accessibilityLabel="Stop Recording"
            >
              {stopIcon}
            </TouchableOpacity>}

        </View>
        <Text>Time Remaining: {60 - this.state.currentTime} seconds</Text>

        <ErrorOverlay
          isVisible={isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <Text>{displayErrorMessage}</Text>
        </ErrorOverlay>
      </View >
    )
  }
}

export default RecorderContainer;