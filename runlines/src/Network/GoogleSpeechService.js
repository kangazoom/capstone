import axios from 'axios';
import keys from '../../keys.json'
export default class GoogleSpeechService {
    constructor() {

    }

    static instance = axios.create({
        baseURL: 'https://speech.googleapis.com',
        timeout: 20000,
    })


    static discover(encodedAudio, phrases) {
        console.log(phrases)
        let axios = this.instance;
        return axios.post(`/v1/speech:recognize/?key=${keys.GCS_API_KEY}`, {
            "audio": {
                "content": encodedAudio,
            },
            "config": {
                "encoding": "MULAW",
                "languageCode": "en-US",
                "sampleRateHertz": 16000,
                "enableAutomaticPunctuation": true,
                "speechContexts": { "phrases": phrases }

                }
            }
        
        ).then((response) => {
            console.log('testing headers good')
            console.log(response.data)
            return Promise.resolve(response.data);
        })
            .catch((error) => {
                console.log('testing headers bad')
                console.log(error)
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
