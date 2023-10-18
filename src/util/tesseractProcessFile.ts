import axios from "axios";
import FormData from "form-data";

export const tesseractProcessFile = async (file: File, setIsProcessingWithTesseract: (arg: boolean) => void) => {
  setIsProcessingWithTesseract(true);
  const endpointUrl = 'http://localhost:3005/scan/pdf'; // Replace with your actual endpoint URL

  const formData = new FormData();
  formData.append('pdf', file, {
    contentType: 'multipart/form-data',
  });

  const strings = await axios.post(endpointUrl, formData, {
    headers: { "Content-Type": "multipart/form-data; charset=utf-8; boundary=__X_PAW_BOUNDARY__" },
  });
  setIsProcessingWithTesseract(false);

  if (!strings.data.text) {
    throw new Error('Network response was not ok');
  }

  return strings.data.text;
}