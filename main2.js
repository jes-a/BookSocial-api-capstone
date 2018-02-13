const MEETUP_ZIP_URL = "https://api.meetup.com/find/locations/";
const MEETUP_EVENTS_URL = "https://api.meetup.com/find/upcoming_events/";
let meetupData = []; 
const EVENTBRITE_KEY = 'DII5KMLS3IPVOZBIEG4M';
const EVENTBRITE_SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';

function getZipFromMeetup(searchTerm, callback) {
	const settings = {
		url: MEETUP_ZIP_URL,
		data: {
			'key': '633a3040393169431e6f4b6953b4f4a',
			'query': `${searchTerm}`
		},
		dataType: 'json',
		type: 'GET',
		crossdomain: true,
		success: callback,
		error: function() {
			console.log('Meetup Zip call error');
		}
		};
	$.ajax(settings);
}	


function displayZipFromMeetup(data) {
	const results = data[0];
	getDataFromMeetup(results.lat, results.lon, function(meetupData) {
		handleMeetupData(meetupData);
	});
}

function handleMeetupData(meetupData) {
	meetupData = meetupData;
}

function getDataFromMeetup(lat, lon, callback) {
	const settings = {
		url: MEETUP_EVENTS_URL,
		data: {
			'sign': 'true',
			'key': '633a3040393169431e6f4b6953b4f4a',
			'text': 'book',
			'lat': `${lat}`,
			'lon': `${lon}`
		},
		dataType: 'json',
		type: 'GET',
		success: callback,
		error: function() {
			console.log('Meetup Zip call error')
		}
		};
	$.ajax(settings);
}	

function displayMeetupResults(meetupData) {
	const meetupResults = meetupData.events.forEach((event, index) => {
		let meetupResult = renderMeetupResults(event);
		$('.js-results').append(meetupResult);
	});
}

function renderMeetupResults(meetupResult) {
	return `<div class="meetup-search-result">
			<h2><a href="${result.link}">${result.name}</a></h2>
			<h4>Date: ${result.local_date}  Time: ${result.local_time}</h4>
			<p>${result.description}</p>
			</div>`;
}


function handleSubmit() {
	$('#search-button').click(event => {
		event.preventDefault();
		console.log('button was clicked');
		const queryTarget = $('#js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		if (query == '') {
			$('.js-results').html("<h2>Please enter a zip code to search for events</h2>");
		} else {
		getZipFromMeetup(query, displayZipFromMeetup);
		getDataFromMeetup(lat, lon, displayMeetupResults);
		}		
	});
}

$(handleSubmit)
$(handleMeetupData)