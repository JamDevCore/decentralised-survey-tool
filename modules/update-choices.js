import { v4 as uuidv4 } from 'uuid';

export const clearChoice = (questions, setNewQuestions, choiceId, questionId) =>  {
    const newQuestionSet = questions.map(q => {
        if(q._id !== questionId) return q;
        const updatedQuestion = q;
        updatedQuestion.choices = updatedQuestion.choices.filter(c => c._id !== choiceId);
        return updatedQuestion;
    });
    setNewQuestions(newQuestionSet);
}

export const addNewChoice = (questions, setNewQuestions, questionId) =>  {
    const newQuestionSet = questions.map(q => {
        if(q._id !== questionId) return q;
        const updatedQuestion = q;
        updatedQuestion.choices = updatedQuestion.choices.concat([{value: '', _id: uuidv4() }])
        return updatedQuestion;
    });
    setNewQuestions(newQuestionSet)
}