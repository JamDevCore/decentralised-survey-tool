import { v4 as uuidv4 } from 'uuid';

export const addNewQuestion = (questions, setNewQuestions) =>  {
    const newQuestionSet = questions.concat([{ question: 'Add your question here', _id: uuidv4(), type: 'multi', choices: [{value: 'Example 1', _id: uuidv4() }, { value: 'Example 2', _id: uuidv4() }]}])
    setNewQuestions(newQuestionSet);
}

export const clearQuestion = (questions, setNewQuestions, questionId) => {
    const newQuestionSet =  questions.filter(q => q._id !== questionId);
    setNewQuestions(newQuestionSet);
}

