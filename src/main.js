import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDC8xhmpYca7jIG50GVYUliXuxW2EKrrgg",
  authDomain: "bs-sign-up.firebaseapp.com",
  projectId: "bs-sign-up",
  storageBucket: "bs-sign-up.appspot.com",
  messagingSenderId: "215177594801",
  appId: "1:215177594801:web:406c9027542c951f091f90",
};

firebase.initializeApp(firebaseConfig);
createApp(App).use(router).mount("#app");
