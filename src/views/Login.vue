<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="Login">
      <table>
        <tr>
          <th><label for="Email">Email: </label></th>
          <td><input type="text" id="Email" v-model="email" /></td>
        </tr>
        <tr>
          <th><label for="Password">Password: </label></th>
          <td><input type="password" id="Password" v-model="password" /></td>
        </tr>
        <tr>
          <td colspan="2"><input type="submit" value="Login" /></td>
        </tr>
      </table>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          console.log(`${user} Logged IN`);
        })
        .catch((err) => alert(err.message));
    };
    return {
      email,
      password,
      Login,
    };
  },
};
</script>
<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
