import {useEffect, useState} from 'react';

import {addNewQuestion, clearQuestion} from '../modules/update-questions'
import {clearChoice, addNewChoice} from '../modules/update-choices'
import { saveSurvey } from '../modules/save-survey';

import {FaTimes, FaCopy} from 'react-icons/fa'
import copyToClipboard from '../modules/copy-to-clipboard';


export default function Home() {
    const [questions, setNewQuestions] = useState([]);
    const [surveyUrl, setSurveyUrl] = useState()
    useEffect(() => {
        console.log(surveyUrl)
    }, [surveyUrl])
    return (
        <>
        <div>
        <nav className="h-16 bg-green-600 w-full p-4 flex">
        <h1 className="text-white text-lg font-bold">Decent Surveys</h1>
        <button className="mr-0 ml-auto bg-white px-4 p-1 rounded border-0 outline-0 shadow pointer" onClick={async () => await saveSurvey(questions, setSurveyUrl)}>Save & Send</button>
        </nav>
    <div className="p-4">
        {surveyUrl && <div key={surveyUrl} className="p-2 bg-indigo-600 flex flex-col w-full mx-auto">
            <p className="text-white text-center text-sm my-1"> Survey published:</p>
            <p id="survey-url" className="text-white text-center text-sm my-2 mb-4"> {typeof window!== 'undefined' && document.location.href + 'take-survey/' + surveyUrl}</p>
            <div className="flex justify-center">
            
                <button className="bg-white text-gray-700 rounded px-4 p-1 mr-1 flex " onClick={() => copyToClipboard('survey-url')}>Copy  <FaCopy className="text-sm my-auto ml-2" /></button>
               
            
            </div>
        </div>}
        </div>
        <main className="p-16">

        <h1 className="text-3xl font-bold underline text-center">
            Create a decentralised survey
         </h1>
         <div className="Survey flex flex-col align-center flex-start p-4">
            <div className="SurveyQuestion flex justify-center">
            <ul className="flex flex-col">{questions.map((question) => {
                return (
                <li key={question._id} className="my-4 bg-gray-200 w-full sm:w-96 p-4 rounded">
                    <div className="QuestionHeader text-lg mb-4">
                        <h3>Question</h3>
                        <input
                        type="text"
                        name=""
                        id={`question-${question._id}`}
                        defaultValue={question.question}
                        className="p-1 my-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          
                        />
                       
                
                    </div>
                    <ul className="flex flex-col">
                    <h3>Options</h3>
                        {question.choices && question.choices.map((choice) => {
                            return (
                                <li className="Question my-1 flex" key={choice._id}>
                                  <input
                                    type="text"
                                    name=""
                                    id={`choice-${choice._id}`}
                                    defaultValue={choice.value}
                                    className="p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            
                                    />
                                    <button className="mx-1" onClick={() => clearChoice(questions, setNewQuestions, choice._id, question._id)}><FaTimes /></button>
                                </li>
                            )
                        })}
                         <li className="text-md my-2" >
                    <button
                           className="rounded bg-blue-400 px-2 p-1 text-white text-sm"
                        onClick={() => addNewChoice(questions.slice(), setNewQuestions, question._id)}
                    > 
                      + Create new option
                     </button>
                   
                </li>
                    </ul>
                    <button onClick={() => clearQuestion(questions.slice(), setNewQuestions, question._id)} className="mr-0 ml-auto bg-red-600 text-white rounded px-4 py-1 my-4">Delete Question</button>
                </li>)
             })}
                <li className="text-lg my-4" >
                    <button
                    className="rounded bg-blue-400 px-4 p-1 text-white"
                        onClick={() => addNewQuestion(questions.slice(), setNewQuestions)}
                    > 
                      + Create new question
                     </button>
                   
                </li>
             </ul>


            </div>
    
         </div>
      
        </main>
      
        </div>
        </>

    )
  }