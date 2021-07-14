<template>
  <div class="about" v-show="status">
    <h1>This is an about page</h1>
  </div>
  <!-- This component will only be showed if user is not logged in -->
  <div v-show="!status">
    <h1>
      You're not Logged In, Click <router-link to="/Login">Here</router-link> to
      Login!
    </h1>
  </div>
</template>
<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "About",
  data() {
    return {
      status: this.checkStatus(),
    };
  },
  methods: {
    checkStatus() {
      return firebase.auth().currentUser;
    },
  },
};
</script>
