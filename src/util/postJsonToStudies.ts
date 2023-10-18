import axios from "axios";

export const postJsonToStudies = async (jsonStrings: string) => {
  const endpointUrl = 'http://localhost:3888/organizations/c822245c-d893-454c-81d0-509432b4561e/studies/9199e421-87c0-48ec-94b8-63821f9a7695/scanned-assessments'; // Replace with your actual endpoint URL

  const res = await axios.post(endpointUrl, JSON.stringify(jsonStrings), {
    headers: { "Content-Type": "application/json" }
  });

  console.log('res after post to JSON', res);

}