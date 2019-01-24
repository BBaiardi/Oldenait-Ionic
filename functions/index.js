const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const env = functions.config();
const algoliasearch = require('algoliasearch');

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('events');

exports.indexEvent = functions.firestore
    .document('events/{eventId}')
    .onCreate((snap, context) => {
        const event = snap.data();
        event.objectId = context.params.eventId;
        return index.addObject(event);
    });

exports.unindexEvent = functions.firestore
    .document('events/{eventId}')
    .onDelete((snap, context) => {
        const objectId = snap.id;
        return index.deleteObject(objectId);
    })