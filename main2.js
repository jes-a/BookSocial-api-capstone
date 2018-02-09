(function() {
const MEETUP_ZIP_URL = "https://api.meetup.com/find/locations",
//			MEETUP_EVENTS_URL = "https://api.meetup.com/find/upcoming_events";

function getZipFromMeetup(searchTerm, callback) {
	const query = {
		'query': `${searchTerm}`
	}
}
$.ajax({
	url: MEETUP_ZIP_URL,
	type: 'GET',
	dataType: 'json',

});

function displayZipFromMeetup(data) {
	const zipResults = data.forEach()
}

function getDataFromMeetup(searchTerm, callback) {
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