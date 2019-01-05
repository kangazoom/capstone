import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class InputTextAPIRequests extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    URL = this.props.URL
    console.log('hi')
    console.log(JSON.stringify(this.props))
    return(
      <View>
      <Text>
      {URL}
      </Text>
      </View>
    );
  }
}

export default InputTextAPIRequests;


// URL = 'localhost:8000/api/inputlines/'
//
// function fetchInputText(URL) {
//   return fetch(URL)
//   .then(response => response.json())
//   .then(responseJSON => {
//     return responseJSON;
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }
//
// export default {fetchInputText: fetchInputText}
