(function() {
const MEETUP_ZIP_URL = "https://api.meetup.com/find/upcoming_events",
			MEETUP_EVENTS_URL = "https://api.meetup.com/find/locations";

function getZipFromMeetup(searchTerm, callback) {
	const query = {
		'query': `${searchTerm}`
	}
}
$.getJSON(MEETUP_ZIP_URL, query, callback)

function displayZipFromMeetup(data) {
	const zipResults = data.
}

function(searchTerm, callback) {
	const query = {
		'sign': 'true',
		'key': '4d1a122f587f52504f6b23424f3e4d48',
		'text': 'book'
	}
}

function handleSubmit() {
	$('#search-button').submit(event => {
		event.preventDefault();
		console.log('button was clicked')
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val();
	});
}

$(handleSubmit);

})();