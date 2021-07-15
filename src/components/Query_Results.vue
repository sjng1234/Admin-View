<template>
	<div class="tableContainer">
		<label for="Filter">Filter Sessions: </label>
		<input type="text" id="Filter" v-model="test" />
		<button type="button" v-on:click="onFilter">Filter</button>
		<button type="button" v-on:click="onReset">Reset</button>
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
		<tr v-for="(items, i) in rows" v-bind:key="i">
			<td>{{ rows.indexOf(items) + 1 }}</td>
			<td>{{ items.name }}</td>
			<td>{{ items.year }}</td>
			<td>{{ items.tele }}</td>
			<td>{{ items.gender }}</td>
			<td>{{ items.matriculation_number }}</td>
			<td>{{ items.faculty }}</td>
			<td>{{ items.email }}</td>
			<td>{{ getSel(items) }}</td>
			<td>{{ items.consent }}</td>
			<td>{{ items.phone }}</td>
		</tr>
		</table>

	</div>
</template>
<script>
import firebase from "firebase";
import { ref, onBeforeMount } from "vue";

export default {
// name = "Query Results",
	setup() {
		const rows = ref([]);
		const filtered_rows = ref([]);
		const original_rows = ref([]);
		const test = ref('');
		const butClick = ref(false);

		onBeforeMount(() => {
			firebase
				.firestore()
				.collection("formData")
				.get()
				.then((Snapshot) => {
				Snapshot.forEach((doc) => {
					original_rows.value.push(doc.data());
					rows.value.push(doc.data());
				});
				})
				.catch((err) => alert(err.message));
		});
		// Implement Filter Course Function
		function filterSel (search,data) {
			return data.filter(rowD=>rowD.selected_sessions.some(s=>s===search))
		}

		// Implement onFilter handler
		const onFilter = () => {
			let data = rows.value;
			let search = test.value;
			filtered_rows.value = filterSel(search,data);
			rows.value = filtered_rows.value;
			butClick.value = true;
		}
		// Implement onReset handler
		const onReset = () => {
			rows.value = original_rows.value;
			butClick.value = false;
			test.value = '';
		}
		// Implement getSelectedSession
		const getSel = (curRow) => {
			if (test.value === '' || !butClick.value) {
				return curRow.selected_sessions.join(',');
			}
			else {
				return test.value;
			}
		}

		return { 
			original_rows, 
			filtered_rows, 
			rows, 
			test, 
			butClick, 
			filterSel, 
			onFilter, 
			onReset ,
			getSel
		};
	},
	
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
