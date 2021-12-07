import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.createUserSpace = functions.auth.user().onCreate(({ uid }) => {
  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      units: {
        livingroom: {
          ac: 0,
          ap: 0,
          camera: 0,
          light: 0,
          tv: 0,
        },
        bedroom: {
          ac: 0,
          ap: 0,
          camera: 0,
          light: 0,
        },
        bathroom: {
          ap: 0,
          light: 0,
          washingmachine: 0,
        },
        kitchen: {
          ap: 0,
          camera: 0,
          dishwasher: 0,
          light: 0,
          refrigerator: 0,
        },
      },
    });
});

exports.deleteUserSpace = functions.auth.user().onDelete(({ uid }) => {
  return admin.firestore().collection("users").doc(uid).delete();
});
