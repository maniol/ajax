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
		flag: item.flag,
		name: item.name,
		capital: item.capital,
		area: item.area,
		population: item.population,
		languages: item.languages.map(function(el){
			return el.name;}).join(' '),
		currencies: item.currencies.map(function(el){
			return el.name;}).join(' ')
	}
	return countryData;
}
function getHTML(data) {
	var templateTableEntry = document.getElementById('template-tableEntry').innerHTML;
	Mustache.parse(templateTableEntry);
	var tableEntryHTML = Mustache.render(templateTableEntry, data);
	return tableEntryHTML;
}
function showCountriesList(response) {
	countriesList.innerHTML = '';
	response.forEach(function(item) {
		var liEl = document.createElement('li');
		var data = getData(item);
		var HTMLtableEntry = getHTML(data);
		liEl.insertAdjacentHTML('beforeend', HTMLtableEntry);
		countriesList.appendChild(liEl);
	});
}
