import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


class TextResultsComparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actualText: this.props.selectedLine,
            spokenText: this.props.transcription,
        }

    }
    evaluateExtraWords = (actualText = this.state.actualText, spokenText = this.state.spokenText) => {
        actualText=this.state.actualText.split(" ").map((word) => word.match(/\w/g).join(""))
        // .split(" ").map((word) => {word.match(/\w/g).join(" ")})
        spokenText=this.state.spokenText.split(" ").map((word) => word.match(/\w/g).join(""))

        let spokenGroups = []

        i = 0;
        j = 0;

        while (i < spokenText.length) {

            // matching, at same index
            if (spokenText[i] === actualText[j]) {
                // good spoken
                spokenGroups.push(i)

                i++
                j++
            }
            else if (spokenText[i] !== actualText[j]) {
                if (j < actualText.length) {
                    j++
                }
                else {
                    i++
                    j = 0
                }
            }
        }
        return spokenGroups
    }

    evaluateMissedWords = (actualText = this.state.actualText, spokenText = this.state.spokenText) => {
        actualText=this.state.actualText.split(" ").map((word) => word.match(/\w/g).join(""))
        spokenText=this.state.spokenText.split(" ").map((word) => word.match(/\w/g).join(""))

        let textGroups = []

        i = 0;
        j = 0;

        while (i < spokenText.length) {

            // matching, at same index
            if (spokenText[i] === actualText[j]) {
                // good match text
                textGroups.push(j)

                i++
                j++
            }
            else if (spokenText[i] !== actualText[j]) {
                if (j < actualText.length) {
                    j++
                }
                else {
                    i++
                    j = 0
                }
            }
        }
        return textGroups
    }

    render() {


        let correctWordsArray = this.evaluateMissedWords()
        console.log(correctWordsArray)
        let extraWordsArray = this.evaluateExtraWords()
        console.log(extraWordsArray)

        const renderActualText = () => {
            let text = ""
            let style = { color: 'red' }
            let textArray = this.state.actualText.split(" ")
            console.log(textArray)
            

            console.log(text)
            return (<View style={{flexDirection: 'row'}}>

                {textArray.map((word, index) => {
                    let style=""
                    if (correctWordsArray.includes(index)) {
                        style = {color: 'black'}
                        console.log
                    }
                    else {
                        style = {color: 'red'}
                    }
                    return (<Text key={index} style={style}>{word} </Text>)
                })}
                    </View>)

            // return text

            // return (<Text style={fontWeight: 'bold'}>'hello hi'</Text>)
        }

        const renderSpokenTranscript = () => {
            let text = ""
            let style = { color: 'red' }
            let spokenTranscriptArray = this.state.spokenText.split(" ")
            console.log(spokenTranscriptArray)
            

            console.log(text)
            return (<View style={{flexDirection: 'row'}}>

                {spokenTranscriptArray.map((word, index) => {
                    let style=""
                    if (extraWordsArray.includes(index)) {
                        style = {color: 'black'}
                        console.log
                    }
                    else {
                        style = {color: 'red'}
                    }
                    return (<Text key={index} style={style}>{word} </Text>)
                })}
                    </View>)

            // return text

            // return (<Text style={fontWeight: 'bold'}>'hello hi'</Text>)
        }




        return (
            <View>
                <Text style={{fontWeight: 'bold'}}>Actual Line:</Text>
                {renderActualText()}
                <Text style={{fontWeight: 'bold'}}>You Said:</Text>
                 {renderSpokenTranscript()}
            </View>
        );
    }
}

export default TextResultsComparison;