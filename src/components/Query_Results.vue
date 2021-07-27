<template>
	<div class="commentDiv">
		<h2> Currently filter implemented by matching entire option to filter:</h2>
		<h3> Example of a valid search term: </h3>
		<p> '9-Lazada-1st September-8:00PM - 9:00PM' </p>
	</div>
	<div class="tableContainer">
		<label for="Filter">Filter Sessions: </label>
		<input type="text" id="Filter" v-model="searchTerm" />
		<button type="button" v-on:click="onFilter">Filter</button>
		<button type="button" v-on:click="onReset">Reset</button>
		<button type="button" v-on:click="onDownload">Download CSV</button>
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
		const searchTerm = ref('');
		const filterClicked = ref(false);

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
			let search = searchTerm.value;
			filtered_rows.value = filterSel(search,data);
			rows.value = filtered_rows.value;
			filterClicked.value = true;
		}
		// Implement onReset handler
		const onReset = () => {
			rows.value = original_rows.value;
			filterClicked.value = false;
			searchTerm.value = '';
		}
		// Implement getSelectedSession
		const getSel = (curRow) => {
			if (searchTerm.value === '' || !filterClicked.value) {
				return curRow.selected_sessions.join(' & ');
			}
			else {
				return searchTerm.value;
			}
		}
		// Download_CSV action
		const download_csv = (csv, filename) => {
			var csvFile;
			var downloadLink;
			// CSV FILE
			csvFile = new Blob([csv], { type: "text/csv" });
			// Download link
			downloadLink = document.createElement("a");
			// File name
			downloadLink.download = filename;
			// We have to create a link to the file
			downloadLink.href = window.URL.createObjectURL(csvFile);
			// Make sure that the link is not displayed
			downloadLink.style.display = "none";
			// Add the link to your DOM
			document.body.appendChild(downloadLink);
			// Click on the download link
			downloadLink.click();
		}

		// Export table as CSV
		const export_table_to_csv = (html, filename) => {
			let csv = [];
			let rows_data = document.querySelectorAll("table tr");
			for (let i = 0; i < rows_data.length; i++) {
				let row = [],
					cols = rows_data[i].querySelectorAll("td, th");
				for (let j = 0; j < cols.length; j++){
					row.push(cols[j].textContent);
				};
				csv.push(row.join(","));
			}// Download CSV
			download_csv(csv.join("\n"), filename);
		}

		// Click Download Button Event Handler
		const onDownload = () => {
			var html = document.querySelector("table").outerHTML;
			export_table_to_csv(html, "table.csv");	
		}

		return { 
			original_rows, 
			filtered_rows, 
			rows, 
			searchTerm, 
			filterClicked, 
			filterSel, 
			onFilter, 
			onReset ,
			getSel,
			export_table_to_csv,
			download_csv,
			onDownload
		};
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
.commentDiv{
	flex-direction: row;
	justify-content: center;
}
</style>
