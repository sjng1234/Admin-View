<template>
  <div class="home" v-show="name !== ''">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div style="align-items: center; justify-content:center">
      <LoadTable />
    </div>
    <button @click="logOut()">Logout</button>
  </div>
  <!-- This component will only be showed if user is not logged in -->
  <div v-show="name === ''">
    <h1>
      You're not Logged In, Click <router-link to="/Login">Here</router-link> to
      Login!
    </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import LoadTable from "../components/Query_Results.vue";
import firebase from "firebase";
import { ref, onBeforeMount } from "vue";

export default {
  components: {
    LoadTable,
  },
  setup() {
    const name = ref("");
    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    const logOut = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed Out"))
        .catch((err) => console.log(err.message));
    };
    return {
      name,
      logOut,
    };
  },
};
</script>
