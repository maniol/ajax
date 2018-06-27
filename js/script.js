var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');
document.getElementById('search').addEventListener('click', searchCountries);
function searchCountries() {
	var countryName = document.getElementById('country-name').value;
	if(!countryName.length) {
		countryName = 'Poland';
	}
	fetch('https://restcountries.eu/rest/v2/name/' + countryName)
		.then(function(response) {
			return response.json();
		})
		.then(showCountriesList);
}
function getData(item) {
	var countryData = {
		flag: '',
		name: '',
		capital: '',
		area: '',
		population: '',
		languages: '',
		currencies: ''
	};
	countryData.flag = item.flag;
	countryData.name = item.name;
	countryData.capital = item.capital;
	countryData.area = item.area;
	countryData.population = item.population;
	item.languages.forEach(function(el){
		countryData.languages += el.name + ' ';
	})
	item.currencies.forEach(function(el){
		countryData.currencies += el.name + '';
	})
	return countryData
}
function getHTML(data) {
	var templateTableEntry = document.getElementById('template-tableEntry').innerHTML;
	Mustache.parse(templateTableEntry);
	var tableEntryHTML = Mustache.render(templateTableEntry, data);
	return tableEntryHTML
}
function showCountriesList(response) {
	countriesList.innerHTML = '';
	response.forEach(function(item) {
		var liEl = document.createElement('li');
		var data = getData(item);
		var HTMLtableEntry = getHTML(data)
		liEl.insertAdjacentHTML('beforeend', HTMLtableEntry);
		countriesList.appendChild(liEl);
	});
}
