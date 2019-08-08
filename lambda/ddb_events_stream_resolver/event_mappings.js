const mappings = {
	_doc: {
		properties: {
			title: {
				type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			description: {
				type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			category: {
				type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			startAt: {
				type: "date"
			},
			endAt: {
				type: "date"
			},
			allDay: {
			    type: "boolean"
			},
			recur: {
			    type: "text"
			},
			forever: {
			    type: "boolean"
			},
			isCancelled: {
			    type: "boolean"
			},
			cancelledDates: {
			    type: "date"
			},
			starred: {
			    type: "keyword"
			},
			createdAt: {
				type: "date"
			},
			updatedAt: {
				type: "date"
			},
			boardId: {
			    type: "keyword"
			},
			isPublic: {
				type: "boolean"
			},
			authorId: {
				type: "keyword"
			},
			id: {
				type: "keyword"
			},
			venue: {
		        type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			location: {
				type: "geo_point"
			}
		}
	}
};

module.exports = mappings;