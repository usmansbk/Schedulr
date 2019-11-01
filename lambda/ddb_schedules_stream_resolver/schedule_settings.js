const settings = {
	analysis: {
		filter : {
			autocomplete_filter : {
				type: "edge_ngram",
				min_gram: 1,
				max_gram: 20
			}
		},
		analyzer : {
			autocomplete : {
				type: "custom",
				tokenizer: "standard",
				filter: [
					"lowercase",
					"autocomplete_filter"
				]
			}
		}
	}
};

module.exports = settings;