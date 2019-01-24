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
            return Promise.resolve(response.data);
        })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}