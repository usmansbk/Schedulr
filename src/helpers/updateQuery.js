export default function({
  prev,
  fetchMoreResult,
  rootField,
  connectionField
}) {
  console.log(prev);
  console.log(fetchMoreResult);
  if (!fetchMoreResult) return prev;

  return Object.assign({}, prev, {
  	[rootField]: Object.assign({}, prev[rootField], {
  		[connectionField]: Object.assign({}, fetchMoreResult[rootField][connectionField], {
  			items: [
  				...prev[rootField][connectionField]['items'],
  			]
  		})
  	})
  });
}