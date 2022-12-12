import axios from 'axios';

export const saveSurvey = async (questions, setSurveyUrl) =>  {
    try {
        const newSurvey = {
            "survey": {
                "questions": questions.map(question => {
                    const newQuestion = question;
                    question.question = document.querySelector(`#question-${question._id}`).value;
                    newQuestion.choices = newQuestion.choices.map(c => {
                        const newChoice = c;
                        newChoice.value = document.querySelector(`#choice-${c._id}`).value;
                        return newChoice
                    })
                    return newQuestion;
                })
            }
        }
        const data = await axios.post('/api/save-new-survey', {
            survey: newSurvey,
        })
      console.log('data', data)
      setSurveyUrl(data.data.hash)
      return;
    } catch (err) {
        console.log(err)
        return 'There was an error saving the survey'
    }
}

