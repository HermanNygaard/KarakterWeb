import admin from "firebase-admin"

try {
    console.log("keu", process.env.KEY)
    admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: process.env.EMAIL,
            privateKey: process.env.KEY,
            projectId: 'karakterweb'
        }),
        databaseURL: 'https://karakterweb.firebaseio.com'
    });
    console.log("succ")
} catch (error) {
    console.log("error!!!", process.env.EMAIL, process.env.KEY)
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export default admin.firestore();