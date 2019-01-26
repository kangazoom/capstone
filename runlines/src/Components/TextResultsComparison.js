import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Heading from './Common/Heading'

class TextResultsComparison extends Component {
    constructor(props) {
        super(props);
    }

    cleanWords = (words) => {
        return words.split(" ").map((word) => {
            return word.toLowerCase().match(/\w/g)
        }).filter(validChar => validChar).map((word) => word.join(""))
    }

    // returns indices of non-extra words based on transcription
    // (mostly - not a perfect diff function by any means, but generally does ok for the average case)
    evaluateExtraWords = () => {
        let actualText = this.cleanWords(this.props.selectedLine)
        let spokenText = this.cleanWords(this.props.transcription)
        let spokenGroups = []
        let i = 0, j = 0;

        while (i < spokenText.length) {
            if (spokenText[i] === actualText[j]) {
                spokenGroups.push(i)
                i++ , j++
            }
            else if (spokenText[i] !== actualText[j]) {
                if (j < actualText.length) {
                    j++
                }
                else {
                    i++ , j = 0
                }
            }
        }
        return spokenGroups
    }

    // returns indices of non-missed words based on the original selected line text
    // (mostly - not a perfect diff function by any means, but generally does ok for the average case)
    evaluateMissedWords = () => {
        let actualText = this.cleanWords(this.props.selectedLine)
        let spokenText = this.cleanWords(this.props.transcription)
        let textGroups = []
        let i = 0, j = 0;

        while (i < spokenText.length) {
            if (spokenText[i] === actualText[j]) {
                textGroups.push(j)
                i++ , j++
            }
            else if (spokenText[i] !== actualText[j]) {
                if (j < actualText.length) {
                    j++
                }
                else {
                    i++ , j = 0
                }
            }
        }
        return textGroups
    }

    // returns indices of lone punctuation marks (ex: " - " or " ?! ") --> the punctuation mark has a space on each side (before AND after)
    // it will evaluate as null after the cleaning function
    findLonePunctuation = (textInput) => {
        let punctuationArray = []
        let splitWordArray = textInput.split(" ")
        for (let i = 0; i < splitWordArray.length; i++) {
            if (splitWordArray[i].match(/\w/g) === null) {
                punctuationArray.push(i)
            }
        }
        return punctuationArray
    }

    // adds the lone punctuation mark (1) to the preceding word, (2) to the following word, OR (3) removes it
    concatPunctuation = (textInput) => {
        let punctuationArray = this.findLonePunctuation(textInput)
        let splitWordArray = textInput.split(" ")

        if (punctuationArray.length > 0) {
            for (let i = 0; i < punctuationArray.length; i++) {
                let punctuationIndex = punctuationArray[i]
                if (splitWordArray[punctuationIndex - 1]) {
                    splitWordArray[punctuationIndex - 1] = splitWordArray[punctuationIndex - 1].concat(splitWordArray[punctuationIndex])
                }
                else if (splitWordArray[punctuationIndex + 1]) {
                    splitWordArray[punctuationIndex + 1] = splitWordArray[punctuationIndex + 1].concat(splitWordArray[punctuationIndex])
                }
                splitWordArray.splice(punctuationIndex, 1)
            }

        }
        return splitWordArray
    }

    render() {
        let {
            selectedLine,
            transcription
        } = this.props

        // we shouldn't even get forwarded to this screen without either valid selectedLine or transcription props,
        // but just in case...
        if (!selectedLine || !transcription) {
            return null;
        }

        let matchedTextWords = this.evaluateMissedWords()
        let nonExtraSpokenWords = this.evaluateExtraWords()

        const renderActualText = () => {
            let textArray = this.concatPunctuation(selectedLine)

            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {textArray.map((word, index) => {
                        let style = ""
                        if (matchedTextWords.includes(index)) {
                            style = { color: '#000' }
                        }
                        else {
                            style = { color: '#FF5151' }
                        }
                        return (<Text key={index} style={style}>{word} </Text>)
                    })}
                </View>
            )
        }

        const renderSpokenTranscript = () => {
            console.log(transcription)
            let spokenTranscriptArray = this.concatPunctuation(transcription)
            console.log(spokenTranscriptArray)

            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {spokenTranscriptArray.map((word, index) => {
                        let style = ""
                        if (nonExtraSpokenWords.includes(index)) {
                            style = { color: '#000' }
                        }
                        else {
                            style = { color: '#FF5151' }
                        }
                        return (<Text key={index} style={style}>{word} </Text>)
                    })}
                </View>
            )
        }

        return (
            <View>
                <Heading>Actual Line:</Heading>
                {renderActualText()}
                <Heading>You Said:</Heading>
                {renderSpokenTranscript()}
            </View>
        );
    }
}

export default TextResultsComparison;