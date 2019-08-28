export default function({
  prev,
  fetchMoreResult,
  rootField,
  connectionField,
}) {
  console.log(prev);
  console.log(fetchMoreResult);

  const itemsField = 'items';
  if (!fetchMoreResult) return prev;

  if (connectionField) {
	  return Object.assign({}, prev, {
	  	[rootField]: Object.assign({}, prev[rootField], {
	  		[connectionField]: Object.assign({}, fetchMoreResult[rootField][connectionField], {
	  			items: [
	  				...prev[rootField][connectionField][itemsField],
	  				...fetchMoreResult[rootField][connectionField][itemsField]
	  			]
	  		})
	  	})
	  });	
  }
  return Object.assign({}, prev, {
  	[rootField]: Object.assign({}, fetchMoreResult[rootField], {
  		items: [
  			...prev[rootField][itemsField],
  			...fetchMoreResult[rootField][itemsField]
  		]
  	})
  });
}