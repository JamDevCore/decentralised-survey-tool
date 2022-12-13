import axios from 'axios';

export const saveResponses = async (questions, setResponseHash, surveyHash, surveyId) =>  {
    try {
        const newResponse = {
            "response": {
                "surveyId": surveyId,
                "surveyHash": surveyHash,
                "questions": questions.map(question => {
                    const newQuestion = question;
                    question.answer = document.querySelector(`#question-${question._id}`)?.value || 'N/A';
                    newQuestion.choices = newQuestion.choices.map(c => {
                        const newChoice = c;
                        newChoice.answer = document.querySelector(`#choice-${c._id}`)?.checked;
                        return newChoice
                    })
                    return newQuestion;
                })
            }
        }
        const data = await axios.post('/api/save-new-response', {
            response: newResponse,
        })
      console.log('data', data)
      setResponseHash(data.data.hash)
      return;
    } catch (err) {
        console.log(err)
        return 'There was an error saving the survey'
    }
}

