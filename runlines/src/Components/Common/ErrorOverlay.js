import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Overlay } from 'react-native-elements';


const ErrorOverlay = (props) => {
    return (
        <Overlay
            onBackdropPress={props.onBackdropPress}
            isVisible={props.isVisible}
            windowBackgroundColor='rgba(52, 52, 52, 0.8)'
            overlayBackgroundColor='salmon'
            height='auto'
            width='auto'
            borderRadius={50}
            containerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: "flex-start" }}
        >
            {props.children}
        </Overlay>

        //   fullScreen={true}

    )
}

const styles = {
    text: {
        alignSelf: 'center',
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
}

export default ErrorOverlay;