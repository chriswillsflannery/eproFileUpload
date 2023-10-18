export const postJsonToStudies = async (jsonStrings: string) => {
  const endpointUrl = 'localhost:3030/organizations/c822245c-d893-454c-81d0-509432b4561e/studies/9199e421-87c0-48ec-94b8-63821f9a7695/scanned-assessments'; // Replace with your actual endpoint URL

  return await fetch(endpointUrl, {
    method: 'POST',
    body: JSON.stringify(jsonStrings),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then(responseData => {
      // Handle the response data here
      console.log('Response Data:', responseData);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch.
      console.error('Error:', error);
    });
}