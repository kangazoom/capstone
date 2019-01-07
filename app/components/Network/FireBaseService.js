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

    static getScripts() {
        //return RNFirebase.firestore().collection('scripts').where('title', '==', parameter.title).get()
        const scriptsReference = RNFirebase.firestore().collection('scripts');
        return scriptsReference.get().then((querySnapshot) => {
            console.log('we made it!')
            let scripts = querySnapshot.docs.map((documentSnapshot) => {
                return documentSnapshot.data()
            });
            console.log('yay')
            return Promise.resolve(scripts)
        })
        .catch((error) => {
            console.log('uh oh')
            return Promise.reject(error)
        })
    }
}