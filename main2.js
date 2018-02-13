const MEETUP_ZIP_URL = "https://api.meetup.com/find/locations/";
const MEETUP_EVENTS_URL = "https://api.meetup.com/find/upcoming_events/";
let meetupData = []; 
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
	const meetupResults = meetupData.events.forEach((event, index) => {
		let meetupResult = renderMeetupResults(event);
		$('.js-results').append(meetupResult);
	});
}

function getDataFromMeetup(lat, lon, callback) {
	const settings = {
		url: MEETUP_EVENTS_URL,
		data: {
			'sign': 'true',
			'key': '633a3040393169431e6f4b6953b4f4a',
			'text': 'book',
			'lat': `${lat}`,
			'lon': `${lon}`,
			'page': '10',		
			'radius': '30.0'
		},
		dataType: 'json',
		type: 'GET',
		crossDomain: true,
		success: callback,
		};
	$.ajax(settings);
}	

function renderMeetupResults(meetupResult) {
	let date = `${meetupResult.local_date}` + 'T' + `${meetupResult.local_time}`;
	let date2 = `${meetupResult.time}`;
	let dateFormatted = moment(date).format('MMM DD YYYY, h:mm a');
	return `<div class="meetup-search-result">
			<h2><a href="${meetupResult.link}">${meetupResult.name}</a></h2>
			<h4>Meetup Group: ${meetupResult.group.name}</h4>
			<h4>Type: Meetup event</h4>
			<h4>Date: ${dateFormatted}</h4>
			</div>`;
}

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
		crossDomain: true,
		success: callback, 
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
	let date = `${result.start.local}`;
	let dateFormatted = moment(date).format('MMM DD YYYY, h:mm a');
	return `<div class="eventbrite-search-result">
			<h2><a href="${result.url}">${result.name.text}</a></h2>
			<h4>Type: Eventbrite event</h4>
			<h4>Date: ${dateFormatted}</h4>
			<p>${result.description.text}</p>
			</div>`;
}


function handleSubmit() {
	$('#search-button').click(event => {
		event.preventDefault();
		const queryTarget = $('#js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		if (query == '') {
			$('.js-results').html("<h2>Please enter a zip code to search for events</h2>");
		} else {
		getZipFromMeetup(query, displayZipFromMeetup);
		getDataFromEventbrite(query, displayEventbriteData);
		}		
	});
}

$(handleSubmit)