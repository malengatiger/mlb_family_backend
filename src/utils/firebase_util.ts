import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
let app: admin.app.App = null;
const tag = '🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ';
/*
gcloud projects add-iam-policy-binding familyarchive-01 \
  --member="serviceAccount:archivebackend-service-account@familyarchive-01.iam.gserviceaccount.com" \
  --role="roles/serviceusage.serviceUsageConsumer"

*/
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  firebaseConfig = {
    apiKey: 'AIzaSyCwWuUjtZgEZnxoXVsQbhqcgrEmrnmACgY',
    authDomain: 'familyarchive-01.firebaseapp.com',
    projectId: 'familyarchive-01',
    storageBucket: 'familyarchive-01.appspot.com',
    messagingSenderId: '148076980089',
    appId: '1:148076980089:web:1e3f99cc904488feab31a8',
    measurementId: 'G-J5R1G3G7RL',
  };

  // Initialize Firebase
  async onApplicationBootstrap() {
    if (!app) {
      console.log(
        `\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`,
      );
      const options: admin.AppOptions = {
        credential: applicationDefault(),
        projectId: 'familyarchive-01',
        serviceAccountId:
          'archivebackend-service-account@familyarchive-01.iam.gserviceaccount.com',
        storageBucket: 'familyarchive-01.appspot.com',
      };

      app = admin.initializeApp(options);
      Logger.log(
        `${tag} ... Firebase initialized:  🥬 options: ${JSON.stringify(app.options)} 🥬`,
      );
      this.check();
    } else {
      Logger.debug(`${tag} ... Firebase already initialized ... ignored!`);
    }
  }

  async check() {
    Logger.log(`check firestore collection by listing at most 10 users ... `);
    const res = await app.firestore().collection('users').limit(10).get();
    res.docs.forEach((m) => {
      Logger.log(`${tag} user : ${JSON.stringify(m.data(), null, 2)}`);
    });

    Logger.log(`${tag} users found in check: ${res.docs.length}`);
  }

  getFirebaseApp() {
    Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
    return app;
  }
}
