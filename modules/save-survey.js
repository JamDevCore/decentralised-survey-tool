import axios from 'axios';

export const saveSurvey = async (questions, setSurveyUrl, setSurveyId) =>  {
    try {
        const newSurvey = {
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
        const data = await axios.post('/api/save-new-survey', {
            survey: newSurvey,
        })
      setSurveyUrl(data.data.hash)
      setSurveyId(data.data.surveyId)
      return;
    } catch (err) {
        console.log(err)
        return 'There was an error saving the survey'
    }
}

