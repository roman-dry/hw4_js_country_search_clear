let storage = () => {
	let countries = [];
	return {
		getCountries: () => countries,
		setCountries: newCountries => countries = newCountries
	}
}

const store = storage();

function getData() {
	fetch('https://restcountries.com/v2/all').then(res => res.json()).then(data => {
	 const countriesBackup = data.map(country => {
	 	return {
	 	  name: country.name,
	 	  population: country.population,
	 	  region: country.region,
	 	  area: country.area
	 	}
	  });
	store.setCountries(countriesBackup);
	renderCountries(countriesBackup);
});
}

getData();

function renderCountries(countries) {
	if(document.querySelector('#countries')) {
		document.querySelector('#countries').remove();
	}

	const elementOfCountries = document.createElement('table');
	elementOfCountries.className = 'table table-bordered table-striped countries-table';
	elementOfCountries.id = 'countries';
	const htmlCountry = countries.reduce((acc, country) => {
		return acc + `<tr>
				<td>${country.name}</td>
				<td>${country.population}</td>
				<td>${country.region}<td/>
				<td>${country.area}</td>
			</tr>`         
	}, '');

	elementOfCountries.innerHTML = `<thead><tr>
				<th data-sort="name">Name</th>
				<th data-sort="population">Population</th>
				<th data-sort="region">Region</th>
				<th data-sort="area">Area</th>
			</tr></thead>
		<tbody>${htmlCountry}</tbody>`;
	
	document.querySelector('.container').append(elementOfCountries);
	
}

function findCountries(searchValue) {
	fetch(`https://restcountries.com/v2/name/${searchValue}`).then(res => res.json()).then(data => {
		const filteredData = data.map(country => {
			
			return {			
				name: country.name,
				population: country.population,
				region: country.region,
				area: country.area
			}
		});
		renderCountries(filteredData);
});
}

document.querySelector('.clear-btn').onclick = e => {
	document.querySelector('#search').value = '';
	getData()
}

document.querySelector('.search-btn').onclick = e => {	
 	document.querySelector('#countries').remove();
	const searchValue = document.querySelector('#search').value.trim().toLowerCase();
 	findCountries(searchValue);
}
