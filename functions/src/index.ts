import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const addAdmin = functions.https.onCall((data, context) => {
    /*const token = context.auth.token.superAdmin;
    if (token !== true) {
        return {
            error: 'Petición no autorizada. El usuario debe tener permisos de superAdmin'
        };
    }*/
    const email = data.email;
    grantAdminRole(email)
    .then(() => {
        console.log('Permiso otorgado');
    })
    .catch(error => {
        console.log(error);
    });
});

async function grantAdminRole(email: string): Promise<void> {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (userRecord.customClaims && (userRecord.customClaims as any).admin === true) {
        return;
    }
    return admin.auth().setCustomUserClaims(userRecord.uid, {
        admin: true
    });
}

/* export const ad = functions.https.onCall(async (data, context) => {
    const adminEmail = data.email;
    return admin.auth().getUserByEmail(adminEmail).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).catch(err => {
        console.log(err);
    });
});

admin.auth().getUserByEmail('baiardibruno@gmail.com').then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
    });
}); */

export const addUserToFirestoreOnCreate = functions.auth.user().onCreate(userRecord => {
    const data = {
        displayName: userRecord.displayName,
        email: userRecord.email,
        photoURL: userRecord.photoURL,
        uid: userRecord.uid
    }
        return admin.firestore().collection('users').add(data).then(() => {
            console.log('Registro agregado correctamente!');
        }).catch(error => {
            console.log(error);
        });
});


