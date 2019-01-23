import RNFirebase from 'react-native-firebase'

let instance = null;

export default class FireBaseService {
    constructor() {
        if (!instance) {
            instance = this;
        }
    }

    static initializeService() {
        new FireBaseService()
    }
    // HERE BEGIN-ETH THE REAL METHODS MWAHAHAH
    // static getScript(id) {
    //     return RNFirebase.firestore().collection('scripts').doc(id)

    // }

    // GET SCRIPTS //
    static getScripts() {
        //return RNFirebase.firestore().collection('scripts').where('title', '==', parameter.title).get()
        const scriptsReference = RNFirebase.firestore().collection('scripts');
        return scriptsReference.get().then((querySnapshot) => {
            let scripts = querySnapshot.docs.map((documentSnapshot) => {
                documentAsData = documentSnapshot.data()
                documentAsData['id'] = documentSnapshot.id
                return documentAsData
            });
            return Promise.resolve(scripts)
        })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    static addScript(scriptInfo) {
        console.log('we here')
        let script_data = scriptInfo.lineList.map((line, index) => {
            return {
            "index": index,
            "line": line,
            "speaking_character": scriptInfo.charHolder[index],
        }
        })
        let script = {
            title: scriptInfo.title,
            author: scriptInfo.author,
            script_data: script_data
        };

        let addDoc = RNFirebase.firestore().collection('scripts')
        addDoc.add(script)
        .then((response) => {
            console.log('successfully added new script')
            console.log(response)
            return Promise.resolve(response)
        })
        .catch((error) => {
            console.log('DID NOT ADD NEW SCRIPT ALERT ALERT')
            return Promise.reject(error)
        })
        // return addDoc
    }

    // ADD ENCODED AUDIO //
    // static addEncodedAudio(encodedAudioData) {
    //     console.log('we here')
    //     let data = {
    //         date_time_created: 'the time is now',
    //         encoded_data: encodedAudioData
    //     };

    //     let addDoc = RNFirebase.firestore().collection('encoded_audio')
    //     addDoc.add(data)

    //     return addDoc

    //     // success? Promise? catch?

    //     // Add a new document in collection "cities" with ID 'LA'
    //     // let setDoc = RNFirebase.firestore().collection('encoded_audio').add(data)
    //     // .then((ref) => {
    //     //     console.log('added doc with ID', ref.id)
    //     //     return Promise.resolve(ref)
    //     // })
    //     //     .catch((error) => {
    //     //         console.log('uh oh')
    //     //         return Promise.reject(error)
    //     //     })
    // }
}
