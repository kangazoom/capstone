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
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      audioLength: 0
    }
    this.timer = null
  }

  prepareRecordingPath(){
    console.log(Constants.AUDIO_PATH)
    AudioRecorder.prepareRecordingAtPath(Constants.AUDIO_PATH, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    })
  }

  record = () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      this.stopPlaying()
    }

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
      this.setState({currentTime: time})
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
    this.setState({audioLength: this.state.currentTime + 1})
    clearInterval(this.timer)
    this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0})
  }

  startPlaying = () => {
    if (this.state.isPaused) {
      AudioPlayer.unpause()      
      this.setState({isPlaying: true, isPaused: false})
      return
    }
    AudioPlayer.play(Constants.AUDIO_PATH)
    this.setState({isPlaying: true})
  }

  pausePlaying = () => {
    AudioPlayer.pause()
    this.setState({isPaused: true, isPlaying: false})
  }

  stopPlaying() {
    AudioPlayer.stop()
    this.setState({isPlaying: false})
  }

  playAudio = () => {
    Actions.player({durationSeconds: this.state.audioLength})
  }

  render() {
    const { 
      isRecording, 
      isFinishRecorded, 
      isPlaying, 
    } = this.state
    const playPauseIcon = isPlaying ? 'pause-circle-o' : 'play-circle-o'
    const playPauseHandler = isPlaying ? this.pausePlaying : this.startPlaying


    console.log(this.state.audioLength)
    console.log(this.state.isFinishRecorded)

    return (
      <View>
        <Button
        title='rec'
        isRecording={isRecording} 
        isFinishRecorded={isFinishRecorded}
        onPress={this.record} />
        {/* <RecordButton></RecordButton> */}
          

          <Button 
          title="stop rec"
          isFinishRecorded={isFinishRecorded} 
          isRecording={isRecording}
          playPauseIcon={playPauseIcon}
          // playPauseHandler={playPauseHandler}
          onPress={this.stopRecording} />

       
        {/* <ActionButtons 
          isFinishRecorded={isFinishRecorded} 
          isRecording={isRecording}
          playPauseIcon={playPauseIcon}
          playPauseHandler={playPauseHandler}
          stopRecording={this.stopRecording} />*/}
        
        <Button title='Play' isDisabled={!isFinishRecorded} onPress={this.playAudio} />
      </View>
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