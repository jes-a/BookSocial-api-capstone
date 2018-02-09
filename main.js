const EVENTBRITE_SEARCH_URL = "https://www.eventbrite.com/developer/v3/endpoints/events/"

function getDataFromGoodReads(searchTerm, callback) {
	const settings = {
		url: EVENTBRITE_SEARCH_URL,
		data: {
		'q': 'book',
		'location.within': '30mi',
		'location.address': `${searchTerm}`,
		},
		dataType: 'json',
		type: 'GET',
		headers: {'Authorization': 'Bearer LNH55YJCVKVQC6U2VZ'},
		verify: 'True',
		success: callback, 
		error: function() {
			console.log('Eventbrite ajax call error!');
		}
		};
		$.ajax(settings);
	}	

function displayEventbriteData(data) {
	const results = data.events.forEach((event, index) => {
		let result = renderResult(event);
		$('.js-results').append(event);
	});
}

function renderEventbriteResults(result) {
	return `<div class="eventbrite-search-result">
			<h2><a href="${result.url}">${result.name}</a></h2>
			</div>`;
}

function handleSubmit() {
	$('#search-button').click(event => {
		event.preventDefault();
		console.log("button clicked");
		const query = $('#js-query').val();
		console.log(query);
		getDataFromGoodReads(query, displayEventbriteData);
	});
}

$(handleSubmit);