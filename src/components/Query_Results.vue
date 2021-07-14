<template>
  <div class="tableContainer">
    <!-- {{rows}} -->
    <table border="1">
        <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Year</th>
            <th>Telegram</th>
            <th>Gender</th>
            <th>Matriculation Number</th>
            <th>Faculty</th>
            <th>Email</th>
            <th>Selected Sessions</th>
            <th>Consent</th>
            <th>Phone Number</th>
        </tr>
        <tr v-for="(items,i) in rows" v-bind:key="i">
            <td>{{rows.indexOf(items)}}</td>
            <td>{{items.name}}</td>
            <td>{{items.year}}</td>
            <td>{{items.tele}}</td>
            <td>{{items.gender}}</td>
            <td>{{items.matriculation_number}}</td>
            <td>{{items.faculty}}</td>
            <td>{{items.email}}</td>
            <td>{{items.selected_sessions}}</td>
            <td>{{items.consent}}</td>
            <td>{{items.phone}}</td>
        </tr>
    </table>
  </div>
</template>
<script>
import firebase from "firebase";
import { ref, onBeforeMount } from "vue";

export default {
    // name = "Query Results",
    setup(){
        const rows = ref([]);
        onBeforeMount (() => {
            firebase.firestore().collection("formData").get()
            .then((Snapshot) => {
                Snapshot.forEach((doc) => {
                    rows.value.push(doc.data());
                });
            })
            .catch(err => alert(err.message));
        })
        
        return {rows}
    }

};
</script>
<style>
.tableContainer {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
