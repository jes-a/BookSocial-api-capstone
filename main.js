const MEETUP_ZIP_URL = 'https://api.meetup.com/find/locations?callback=?';
const MEETUP_EVENTS_URL = 'https://api.meetup.com/find/upcoming_events?callback=?';
const API_KEY = '633a3040393169431e6f4b6953b4f4a';
const EVENTBRITE_SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/'; 
let hasMeetupData = false;

// Input zip code from search form to get lat and lon coordinates in order to display local events
function getZipFromMeetup(searchTerm, callback) {
    const query = {
        'sign': true,
        'key': API_KEY,
    	'query': `${searchTerm}`,
        }
    $.getJSON(MEETUP_ZIP_URL, query, callback);
}    

function displayZipFromMeetup(data) {
	if (data.data.length > 0) {
		hasMeetupData = true;
	} 
	let results = data.data[0];
	getDataFromMeetup(results.lat, results.lon, function(meetupData) {
		handleMeetupData(meetupData);
	});
}

// Get meetup event information from meetup API
function getDataFromMeetup(lat, lon, callback) {
	const query = {
            'sign': true,
            'key': API_KEY,
			'lat': `${lat}`,
			'lon': `${lon}`,
			'order': 'time',
			'page': '20',		
			'radius': '30.0',
			'text': 'book',
			'topic_category': '222'
		}
	$.getJSON(MEETUP_EVENTS_URL, query, callback);
}	

function handleMeetupData(meetupData) {
	const meetupResults = meetupData.data.events.forEach((event, index) => {
		let meetupResult = renderMeetupResults(event);
		$('#js-search-results-section').append(meetupResult);
	});
}


// Format dates correctly from returned JSON data and provides html formatted response
function renderMeetupResults(meetupResult) {
	let date = `${meetupResult.local_date}` + 'T' + `${meetupResult.local_time}`;
	let date2 = `${meetupResult.time}`;
	let dateFormatted = moment(date).format('MMM DD YYYY, h:mm a');
	let date2Formatted = moment.unix(date2/1000).format('MMM DD YYYY, h:mm a');
	if (date !== 'undefinedTundefined') {
		return `<div class="search-result">
				<img class="type-logo" src="images/meetup-logo.png" alt="meetup logo">
				<h3><a class="meetup-h3" href="${meetupResult.link}" target="_blank">${meetupResult.name}</a></h3>
				<h4>Date: ${dateFormatted} </h4>
				<h5>Meetup Group: ${meetupResult.group.name}</h5>
				<h5>Meetup Type: ${meetupResult.group.join_mode}</h5>
				</div>`;
	} else {
		return `<div class="search-result">
				<img class="type-logo" src="images/meetup-logo.png" alt="meetup logo">
				<h3><a class="meetup-h3" href="${meetupResult.link}" target="_blank">${meetupResult.name}</a></h3>
				<h4>Date: ${date2Formatted} </h4>
				<h5>Meetup Group: ${meetupResult.group.name}</h5>
				<h5>Meetup Type: ${meetupResult.group.join_mode}</h5>
				</div>`;
	}

}

// Get event data from EventBrite API
function getDataFromEventbrite(searchTerm, callback) {
	const query = {
		'q': 'book',
		'location.within': '30mi',
		'location.address': `${searchTerm}`,
		'token': 'DII5KMLS3IPVOZBIEG4M',
		'sort_by': 'date'
		}
	$.getJSON(EVENTBRITE_SEARCH_URL, query, callback);
}	

function displayEventbriteData(eventBriteData) {
	const results = eventBriteData.events.forEach((event, index) => {
		let result = renderEventbriteResults(event);
		$('#js-search-results-section').append(result);
	});
}

function renderEventbriteResults(result) {
	let date = `${result.start.local}`;
	let dateFormatted = moment(date).format('MMM DD YYYY, h:mm a');
	return `<div class="search-result">
			<img class="type-logo" src="images/eventbrite-orange.png" alt="eventbrite logo">
			<h3><a class="eventbrite-h3" href="${result.url}" target="_blank">${result.name.text}</a></h3>
			<h4>Date: ${dateFormatted}</h4>
			<h5 id="truncated-desc">${result.description.text}</h5>
			</div>`;
}


function validateZipCode(query) {
    return (/^\b\d{5}(-\d{4})?\b$/).test(query);
}

function handleSubmit() {
	$('#js-form').submit(event => {
		event.preventDefault();
		const queryTarget = $('.js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		const isValid = validateZipCode(query);
		if (query == '') {
			$('.js-error').html('<p class="error">Please enter a zip code to search for events</p>');
        } else if (isValid != true) {
            $('.js-error').html('<p class="error">Please enter a valid zip code</p>');
   //      } else if (hasMeetupData === false) {
			// $('.js-error').html(`<p class="error">No Search Results for ${query}.</p>`);
		} else {
			$('.js-error').hide();
			$('#js-landing-page').hide();
			$('#js-search-results-page').show();
			$('#js-search-results-h2').append(query);
			getZipFromMeetup(query, displayZipFromMeetup);
			getDataFromEventbrite(query, displayEventbriteData);
		}		
	});
}

// Handle recurrent user search
function handleNewSearch() {
	$('#js-new-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $('.js-query2');
		const query = queryTarget.val();
		queryTarget.val('');
		const isValid = validateZipCode(query);
		if (query == '') {
			$('.js-error').show();
			$('#js-search-results-section').empty();
			$('#js-search-results-h2').empty();
			$('#key-text').hide();
			$('.js-error').html('<p class="error">Please enter a zip code to search for events</p>');
        } else if (isValid != true) {
        	$('.js-error').show();
			$('#js-search-results-section').empty();
			$('#js-search-results-h2').empty();
			$('#key-text').hide();
            $('.js-error').html('<p class="error">Please enter a valid zip code</p>');
   //      } else if (meetupData.length == 0) {
			// $('#js-search-results-section').empty();
			// $('#js-search-results-h2').empty();
			// $('#key-text').hide();
			// $('.js-error').html(`<p class="error">No Search Results for ${query}.</p>`);
        } else { 
			$('.js-error').hide();
			$('#js-search-results-section').empty();
			$('#js-search-results-h2').empty();
			$('#js-search-results-h2').html(`<h2 class="results-h2">Search Results for ${query}</h2> `);
			getZipFromMeetup(query, displayZipFromMeetup);
			getDataFromEventbrite(query, displayEventbriteData);
        }
	});
}

$(handleSubmit)
$(handleNewSearch)