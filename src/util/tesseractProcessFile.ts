export const tesseractProcessFile = async (file: File, setIsProcessingWithTesseract: (arg: boolean) => void) => {
  setIsProcessingWithTesseract(true);
  const endpointUrl = 'localhost:3005/scan/pdf'; // Replace with your actual endpoint URL

  const formData = new FormData();
  formData.append('pdfFile', file);

  const strings = await fetch(endpointUrl, {
    method: 'POST',
    headers: { "Content-Type": "multipart/form-data; charset=utf-8; boundary=__X_PAW_BOUNDARY__" },
    body: formData,
  })
  setIsProcessingWithTesseract(false);

  if (!strings.ok) {
    throw new Error('Network response was not ok');
  }

  return strings.json();
}