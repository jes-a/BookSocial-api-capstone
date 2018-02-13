const KEY = 'DII5KMLS3IPVOZBIEG4M';
const EVENTBRITE_SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';

function getDataFromEventbrite(searchTerm, callback) {
	const settings = {
		url: EVENTBRITE_SEARCH_URL,
		data: {
		'q': 'book',
		'location.within': '30mi',
		'location.address': `${searchTerm}`,
		'token': 'DII5KMLS3IPVOZBIEG4M'
		},
		dataType: 'json',
		type: 'GET',
		crossdomain: true,
		success: callback, 
		error: function() {
			console.log('Eventbrite ajax call error!');
		}
		};
	$.ajax(settings);
}	

function displayEventbriteData(data) {
	const results = data.events.forEach((event, index) => {
		let result = renderEventbriteResults(event);
		$('.js-results').append(result);
	});
}

function renderEventbriteResults(result) {
	return `<div class="eventbrite-search-result">
			<h2><a href="${result.url}">${result.name.text}</a></h2>
			<h4>Date: ${result.start.local}  Time: ${result.start.local}</h4>
			<p>${result.description.text}</p>
			</div>`;
}

function handleSubmit() {
	$('#search-button').click(event => {
		event.preventDefault();
		console.log("button clicked");
		const queryTarget = $('#js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		if (query == '') {
			$('.js-results').html("<h2>Please enter a zip code to search for events</h2>");
		} else {
		getDataFromEventbrite(query, displayEventbriteData);
		}
	});
}

$(handleSubmit);