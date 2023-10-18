import { OpenAI } from 'openai';

const OPENAI_API_KEY = "FAKE KEY ! GOES HER !";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function makeGPTRequest(setIsProcessingInOAPI: (arg: boolean) => void) {
  setIsProcessingInOAPI(true);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": "You are the transform component of an ETL pipeline that consumes paper forms and converts the input to JSON to be used by another process" },
      {
        "role": "user", "content": `Given the string input from a scanned form, convert it to JSON. Here's an example form and the way I'd like you to transform it to JSON

      Gait Assessment

      1. Daily Routine: Do you have trouble walking? Yes or No.
      2. Frequency: How often do you use an aid when walking? Never 0 Sometimes 1 Always 2
      3. When was the last time you went for a walk longer than 2 miles? Free text response
      4. Explain any other mobility issues you may have

      {
        "name": "Gait Assessment",
        "steps": [
          {
            "header": "Daily Routing", // This captures to the heading for a question
            "body": "Do you have trouble walking?", // the question text will appear here
            "question": {
              "kind": "multiple_choice", // the kind of question, options are 'text' for free text or 'multiple choice' to allow specified options
              "multiple_choice": {
                "options": [
                  {
                    "label": "Yes"
                  },
                  {
                    "label": "No"
                  }
                ]
              }
            }
          },
          {
            "header": "Frequency",
            "body": "How often do you use an aid when walking?", // the question text will appear here
            "question": {
              "kind": "multiple_choice", // the kind of question, options are 'text' for free text or 'multiple choice' to allow specified options
              "multiple_choice": {
                "options": [
                  {
                    "label": "Never", // this is the human readable label for an option in a question
                    "score": 0 // this is a numeric value attached to a question
                  },
                  {
                    "label": "Sometimes",
                    "score": 1
                  },
                  {
                    "label": "Always",
                    "score": 2
                  }
                ]
              }
            }
          },
          {
            "header": null,
            "body": "When was the last time you went for a walk longer than 2 miles?", // the question text will appear here
            "question": {
              "kind": "text", // the kind of question, options are 'text' for free text or 'multiple choice' to allow specified options
              "text": {
                "character_limit": 500
              },
            }
          },
          {
            "header": null,
            "body": "Explain any other mobility issues you may have", // the question text will appear here
            "question": {
              "kind": "text", // the kind of question, options are 'text' for free text or 'multiple choice' to allow specified options
              "text": {
                "character_limit": 500
              },
            }
          }
        ]
      }

      Some forms will be formatted differently but should be transformed to this example JSON format/template. Once you're done, you will return JSON where there are an array of questions and metadata for each question. Return only JSON output without any other text.`},
      { "role": "assistant", "content": "Understood. Please provide the form and I will transform it to JSON using the example template above." },
      {
        "role": "user", "content": `1. Feeling nervous, anxious, or on edge
      2. Not being able to stop or control worrying
      3. Worrying too much about different things
      4. Trouble relaxing
      5. Being so restless that it is hard to sit still
      6. Becoming easily annoyed or irritable
      0123 0123
      0123 0123 0123 0123
      GAD-7 Anxiety
        Over the last two weeks, how often have you been bothered by the following problems?
          Not at all
          Several days
        More than half the days
        Nearly every day
                                    7. Feeling afraid, as if something awful
      might happen 0123
          Column totals
      _____ + _____ + _____ + _____ =
      Total score _______
      If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?
      Not difficult at all Somewhat difficult Very difficult Extremely difficult
      □□□□
      Source: Primary Care Evaluation of Mental Disorders Patient Health Questionnaire (PRIME-MD-PHQ). The PHQ was developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues. For research information, contact Dr. Spitzer at ris8@columbia.edu. PRIME-MD® is a trademark of Pfizer Inc. Copyright© 1999 Pfizer Inc. All rights reserved. Reproduced with permission
      Scoring GAD-7 Anxiety Severity
      This is calculated by assigning scores of 0, 1, 2, and 3 to the response categories, respectively, of “not at all,” “several days,” “more than half the days,” and “nearly every day.”
      GAD-7 total score for the seven items ranges from 0 to 21.
      0–4: minimal anxiety 5–9: mild anxiety
      10–14: moderate anxiety 15–21: severe anxiety`}
    ]
  });

  console.log(completion);
  setIsProcessingInOAPI(false);
  return completion;
}
