import axios from 'axios';

export default class GoogleSpeechService {
    constructor() {

    }

    static instance = axios.create({
        baseURL: 'https://speech.googleapis.com',
        timeout: 20000,
        headers: {}
    })

// takes in audio data and config info as objects
    // static recognize(recognitionAudio) {
    //     return axios.post(127.0.0.1)
    // }

    static discover() {
        let axios = this.instance;
        return axios.get('/$discovery/rest?version=v1').then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }
}


// method: 'post',
// url: '/user/12345',
// data: {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// }
// });