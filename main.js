const GOODREADS_SEARCH_URL = "https://www.goodreads.com/event/index.xml";

function getDataFromGoodReads(searchTerm, callback) {
	const query = {
		'key': 'D18iDrc0VZMILzdwA1A6qQ',
		'search[postal_code]': `${searchTerm}`
	}
	$.getJSON(GOODREADS_SEARCH_URL, query, callback);
}

function displayGoodReadsData(data) {
	const results = data.events.forEach((event, index) => {
		let result = renderResult(event);
		$('.js-results').append(event);
	});
}

function renderGoodReadsResults(result) {
	return `<div class="goodreads-search-result">
			<h2><a href="${result.link}">${result.title}</a></h2>
			</div>`;
}

function handleSubmit() {
	$('#search-button').submit(event => {
		debugger;
		event.preventDefault();
		console.log("button clicked");
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val();
		getDataFromGoodReads(query, displayGoodReadsData);
	});
}

$(handleSubmit);