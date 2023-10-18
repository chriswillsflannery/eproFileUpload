export const tesseractProcessFile = async (file: File, setIsProcessingWithTesseract: (arg: boolean) => void) => {
  setIsProcessingWithTesseract(true);
  const endpointUrl = 'https://example.com/public/endpoint'; // Replace with your actual endpoint URL

  console.log('file', file);

  const formData = new FormData();
  formData.append('pdfFile', file);

  console.log('formData', formData);

  return await fetch(endpointUrl, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      setIsProcessingWithTesseract(false);
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