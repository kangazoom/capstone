import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


class TextResultsComparison extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     // const me = this;
    //     let correctWordsArray = this.evaluateMissedWords()
    //     console.log(correctWordsArray)
    //     let extraWordsArray = this.evaluateExtraWords()
    //     console.log(extraWordsArray)

    //     this.setState = ({
    //         correctWordsArray: correctWordsArray,
    //         extraWordsArray: extraWordsArray
    //     })

    //   }
    evaluateExtraWords = () => {
        let actualText=this.props.selectedLine.split(" ").map((word) => word.toLowerCase().match(/\w/g)).filter(validChar => validChar).map((word) => word.join(""))
        // .split(" ").map((word) => {word.match(/\w/g).join(" ")})
        let spokenText=this.props.transcription.split(" ").map((word) => word.toLowerCase().match(/\w/g)).filter(validChar => validChar).map((word) => word.join(""))
        let spokenGroups = []
        // console.log(`cleaned actual text length: ${actualText.length}`)
        // console.log(`cleaned spoken text length: ${spokenText.length}`)


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
        console.log(spokenGroups)
        return spokenGroups
    }

    evaluateMissedWords = () => {
       let actualText=this.props.selectedLine.split(" ").map((word) => word.toLowerCase().match(/\w/g)).filter(validChar => validChar).map((word) => word.join(""))
       let spokenText=this.props.transcription.split(" ").map((word) => word.toLowerCase().match(/\w/g)).filter(validChar => validChar).map((word) => word.join(""))

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
        console.log(textGroups)
        return textGroups
    }


    findLonePunctuation = (textInput) => {
        let punctuationArray = []
        let splitty = textInput.split(" ")
        for (let i=0; i < splitty.length; i++) {
          if (splitty[i].match(/\w/g)===null) {
            punctuationArray.push(i)
        }
      }
      return punctuationArray
      }
      
      concatPunctuation = (textInput) => {
        let punctuationArray = this.findLonePunctuation(textInput)
        let splitty = textInput.split(" ")
        // console.log(splitty.length)
        if (punctuationArray.length > 0) {
      
          for (let i=0; i < punctuationArray.length; i++) {
            // console.log(punctuationArray[i])
            let punctuationIndex = punctuationArray[i]
            if (splitty[punctuationIndex-1]) {
            splitty[punctuationIndex-1] = splitty[punctuationIndex-1].concat(splitty[punctuationIndex])
            }
            else if (splitty[punctuationIndex+1]) {
              splitty[punctuationIndex+1] = splitty[punctuationIndex+1].concat(splitty[punctuationIndex])
            }
              splitty.splice(punctuationIndex, 1)
          }
      
        }
        //   console.log(splitty.length)
      
        return splitty
      }

    render() {
        // I think I need this so that stuff doesn't render before the scripts do
        if (!this.props.selectedLine || !this.props.transcription) {
            return null;
        }

        let correctWordsArray = this.evaluateMissedWords()
        // console.log(`correct words array: ${correctWordsArray}`)
        let extraWordsArray = this.evaluateExtraWords()
        // console.log(`non-extra words array: ${extraWordsArray}`)

        // this.setState = ({
        //     correctWordsArray: correctWordsArray,
        //     extraWordsArray: extraWordsArray
        // })

        const renderActualText = () => {
            let text = ""
            let textArray = this.concatPunctuation(this.props.selectedLine)
            console.log(`actual text length: ${textArray.length}`)
            // console.log(textArray)
            
            return (<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

                {textArray.map((word, index) => {
                    let style=""
                    if (correctWordsArray.includes(index)) {
                        style = {color: 'black'}
                    }
                    else {
                        style = {color: 'red'}
                    }

                    return (<Text key={index} style={style}>{word} </Text>)
                })}
                    </View>)

        }

        const renderSpokenTranscript = () => {
            let text = ""
            let spokenTranscriptArray = this.concatPunctuation(this.props.transcription)
            console.log(`spoken transcript length: ${spokenTranscriptArray.length}`)

            return (<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

                {spokenTranscriptArray.map((word, index) => {
                    let style=""
                    if (extraWordsArray.includes(index)) {
                        style = {color: 'black'}
                    }
                    else {
                        style = {color: 'red'}
                    }
                    return (<Text key={index} style={style}>{word} </Text>)
                })}
                    </View>)

        }






        return (
            <View>
                <Text style={{fontWeight: 'bold'}}>Actual Line:</Text>
                {renderActualText()}
                <Text style={{fontWeight: 'bold'}}>You Said:</Text>
                 {renderSpokenTranscript()}
                 {/* <Text>{this.state.extraWordsArray}</Text> */}
            </View>
        );
    }
}

export default TextResultsComparison;