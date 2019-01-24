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

    // GET SCRIPTS //
    static getScripts() {
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
            description: scriptInfo.description,
            script_data: script_data
        };

        let addDoc = RNFirebase.firestore().collection('scripts')
        addDoc.add(script)
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) => {
            return Promise.reject(error)
        })

    }
}
