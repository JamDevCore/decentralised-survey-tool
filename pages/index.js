import {useEffect, useState} from 'react';

import {addNewQuestion, clearQuestion} from '../modules/update-questions'
import {clearChoice, addNewChoice} from '../modules/update-choices'
import { saveSurvey } from '../modules/save-survey';

import {FaTimes, FaCopy, FaCheck, FaPlus , FaSpinner } from 'react-icons/fa'
import copyToClipboard from '../modules/copy-to-clipboard';


export default function Home() {
    const [questions, setNewQuestions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [surveyUrl, setSurveyUrl] = useState()
    const [surveyId, setSurveyId] = useState()
    useEffect(() => {
        console.log(surveyUrl)
    }, [surveyUrl])
    return (
        <>
        <div>

    <div className="p-4">
    <h1 className="text-3xl font-bold underline text-center my-4">
            {"DecentSurveys"}
         </h1>
   
         <div className="text-center w-full md:w-1/2  mx-auto mt-4">
         <span className="text-gray-500 font-bold block my-4 italic"> No emails, no signup. Just surveys.</span>
         <p>
            DecentSurveys are anonymous, decentralised surveys and questionnaires. We don't own any of your data. All responses will be posted to a public, peer to peer file storage system.<span className="underline font-bold block my-4"> Don't ask anyone to reveal personal data.</span>
            </p>
            
            </div>
      
        </div>
        <main className="p-4 w-full">

        {surveyUrl ? <div key={surveyUrl} className="w-full md:w-1/2 p-2 bg-indigo-600 flex flex-col w-full mx-auto rounded p-4 mt-8">
            <p className="text-white text-center text-smd my-1 flex justify-center"> Survey published! <FaCheck className="my-auto ml-2"/></p>
            <p  className=" text-gray-200 text-center text-sm my-2">Take survey<a href={typeof window!== 'undefined' && document.location.href + 'take-survey/' + surveyUrl} id="survey-url" className="underline text-gray-200 text-center text-sm my-2"> {typeof window!== 'undefined' && document.location.href + 'take-survey/' + surveyUrl}</a></p>
            <p className="text-gray-200 text-center text-sm mb-2 "> View results: <a id="survey-url" className="underline" href={typeof window!== 'undefined' && document.location.href + 'survey-results/' + surveyUrl}>{typeof window!== 'undefined' && document.location.href + 'survey-results/' + surveyUrl}</a></p>
            <p  className="text-gray-200 text-center text-sm mb-4">ID: {surveyId}</p>
            <div className="flex justify-center">
            
                <button className="bg-white text-gray-700 rounded px-4 p-1 mr-1 flex " onClick={() => copyToClipboard('survey-url')}>Copy  <FaCopy className="text-sm my-auto ml-2" /></button>
               
            
            </div>
        </div> : 
         <div className="Survey flex flex-col align-center flex-start p-4 w-full">
            <div className="SurveyQuestion w-full md:w-1/2 mx-auto">
            <ul className="flex flex-col">{questions.map((question) => {
                return (
                <li key={question._id} className="my-4 shadow w-full  p-6 rounded">
                    <div className="QuestionHeader text-lg mb-4">
                        <h3>Question</h3>
                        <input
                        type="text"
                        name=""
                        id={`question-${question._id}`}
                        placeholder={question.question}
                        className="p-1 my-1 block w-full border-gray-300 border-b shadow-sm focus:border-indigo-500 focus:outline-none sm:text-sm"
          
                        />
                       
                
                    </div>
                    <ul className="flex flex-col">
                    <h3>Options</h3>
                        {question.choices && question.choices.map((choice) => {
                            return (
                                <li className="Question my-2 flex" key={choice._id}>
                                  <input
                                    type="text"
                                    name=""
                                    id={`choice-${choice._id}`}
                                    placeholder={question.question}
                                    className="p-1 block w-full  border-gray-300 shadow-sm border-b focus:border-indigo-500  focus:outline-none sm:text-sm"
                            
                                    />
                                    <button className="mx-1 ml-2 px-2" onClick={() => clearChoice(questions, setNewQuestions, choice._id, question._id)}><FaTimes /></button>
                                </li>
                            )
                        })}
                         <li className="text-md my-2" >
                    <button
                           className="rounded border-2 border-indigo-500 px-2 p-1 text-indigo-500 text-sm"
                        onClick={() => addNewChoice(questions.slice(), setNewQuestions, question._id)}
                    > 
                      + Create new option
                     </button>
                   
                </li>
                    </ul>
                    <button onClick={() => clearQuestion(questions.slice(), setNewQuestions, question._id)} className=" ml-auto mr-0  block bg-red-600 text-white rounded px-4 py-1 mt-6 my-4">Delete</button>
                </li>)
             })}
                <li className="text-lg my-4" >
                    <button
                    className="rounded bg-blue-600 px-4 p-1 text-white flex block mx-auto"
                        onClick={() => addNewQuestion(questions.slice(), setNewQuestions)}
                    > 
                     <FaPlus className="my-auto mr-2 text-xs"/> Create new question
                     </button>
                   
                </li>
             </ul>


            </div>
            <div className="w-full md:w-1/2 mx-auto shadow rounded p-4 mt-4 bg-gray-100 mt-16">
             <button className="bg-white px-4 p-1 rounded border-2 border-green-800 outline-0 shadow pointer text-green-800 my-4 mx-auto block flex" disabled={questions.length === 0} onClick={async () => {
                try {
                setLoading(true)
                await saveSurvey(questions, setSurveyUrl, setSurveyId)
                setLoading(false)
                } catch (er) {
                    console.log(er)
                    setLoading(false)
                }
             }}>{loading && <FaSpinner className="my-auto mr-4 spinner"/>}{loading ? 'Saving' : 'Save & Send'}</button>
             <p className="text-gray-400 text-center">Once you have completed your survey, simply save it by pressing the button above. You're survey link and results link will be generated. Remember to store these yourself and keep them for your reference </p>
            </div>
         </div>}
      
        </main>
      
        </div>
        </>

    )
  }