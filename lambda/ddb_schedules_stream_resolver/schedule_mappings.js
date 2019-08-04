const mappings = {
	_doc: {
		properties: {
			name: {
				type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			description: {
				type: "text",
				analyzer: "autocomplete",
				search_analyzer: "standard"
			},
			isPublic: {
				type: "boolean"
			},
			createdAt: {
				type: "date"
			},
			updatedAt: {
				type: "date"
			},
			authorId: {
				type: "keyword"
			},
			id: {
				type: "keyword"
			},
			followers: {
				type: "keyword"
			},
			status: {
				type: "keyword"
			},
			location: {
				type: "geo_point"
			}
		}
	}
};

module.exports = mappings;