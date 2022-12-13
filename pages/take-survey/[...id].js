import axios from 'axios';
import {useEffect, useState} from 'react';
import {FaPaperPlane, FaCopy, FaSpinner} from 'react-icons/fa'
import { saveResponses } from '../../modules/save-responses';
import copyToClipboard from '../../modules/copy-to-clipboard';


export default function TakeSurvey({ survey, surveyHash }) {
    const [responseHash, setResponseHash] = useState('');
    const [loading, setLoading] = useState(false)
    const parseSurvey = JSON.parse(survey);
    useEffect(() => {
    }, [responseHash])
    return (
        <>
        <div>
        <main className="p-16">

        <h1 className="text-3xl font-bold underline text-center my-4">
            {survey?.survey?.title || "DecentSurveys"}
         </h1>
   
         <div className="text-center w-full md:w-1/2 mx-auto mt-4">
         <p>
            DecentSurveys are anonymous, decentralised surveys and questionnaires. We don't own any of your data. All your responses will be posted to a public, peer to peer file storage system.<span className="underline font-bold block my-4"> Don't reveal any personal data.</span>
            </p>
            
            </div>
            {!responseHash ?
             <div className="Survey flex flex-col align-center flex-start mx-auto p-4 w-full">
            <div className="SurveyQuestion flex justify-center w-full mx-auto w-full">
            <ul className="flex flex-col w-full md:w-1/2">
                {parseSurvey.questions.map((question, i) => {
                return (
                <li key={question._id} className="my-4 w-full p-4 rounded shadow">
                    <div>
         
                        <label className="text-base text-xl font-bold text-gray-900">{question.question}</label>
                        <p className="text-md text-gray-500">Question {i + 1 }</p>
                        <fieldset className="mt-4">
                            <legend className="sr-only">Notification method</legend>
                            <div className="space-y-4">
                            {question?.choices && question.choices.map((choice, index) => (
                               <fieldset className="border-t border-gray-200">
                               <legend className="sr-only">{choice.value}</legend>
                               <div className="">
                                 <div className="relative flex items-start py-4">
                                   <div className="min-w-0 flex-1 text-sm">
                              
                       
                                     <label htmlFor="comments" className="text-md text-gray-900">
                                     
                                       {choice.value}
                                     </label>
                                     <p id="comments-description" className="text-gray-500">
                                     Option {index + 1}
                                     </p>
                                   </div>
                                   <div className="ml-3 flex items-center">
                                     <input
                                       id={`choice-${choice._id}`}
                                       aria-describedby="comments-description"
                                       name="comments"
                                       type="checkbox"
                                       className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                                     />
                                   </div>
                                 </div>
                               </div>
                             </fieldset>
                            ))}
                            </div>
                        </fieldset>
                        </div>

                
                </li>)
             })}
                <li className="text-lg my-4 flex justify-content center" >
                    <button
                    className="rounded bg-green-600 px-4 p-1 text-white flex mx-auto"
                        onClick={async () => {
                            try {
                                setLoading(true)
                                await saveResponses(parseSurvey.questions.slice(), setResponseHash, surveyHash, parseSurvey.surveyId)
                                setLoading(false)
                                } catch (er) {
                                    console.log(er)
                                    setLoading(false)
                                }
                           
                        }}
                    > 
                      {loading ? <FaSpinner className="my-auto mr-4 spinner"/>: <FaPaperPlane   className="font-xs mr-4 my-auto"/>} {loading ? 'Submitting' :'Submit your responses'}
                     </button>
                   
                </li>
             </ul>


            </div> 
    
         </div> : <div key={parseSurvey.surveyId} className="p-4 bg-indigo-600 flex flex-col w-full mx-auto rounded my-8">
            <p className="text-white text-center text-sm my-1"> Response published! </p>
            
            <p id="" className="text-white text-center text-sm my-2">IPFS hash: {responseHash}</p>
            <p id="" className="text-white text-center text-sm"> </p>
            <p  className="text-white text-center text-sm mb-4"> View all results: <a id="survey-url" className="underline" href={typeof window !== 'undefined' && document.location.origin + '/survey-results/' + surveyHash} >{typeof window !== 'undefined' && document.location.origin + '/survey-results/' + surveyHash}</a></p>
            <div className="flex justify-center">
            
                <button className="bg-white text-gray-700 rounded px-4 p-1 mr-1 flex text-sm" onClick={() => copyToClipboard('survey-url')}>Copy  <FaCopy className="text-sm my-auto ml-2" /></button>
               
            
            </div>
            </div>}
         <p className="text-xs text-gray-400 text-center mt-4">IPFS survey hash </p>
         <p className="text-xs text-gray-400 text-center">{surveyHash}</p>
        </main>
      
        </div> 
        </>

    )
  }
  export async function getServerSideProps(context) {
    const hash = context?.params?.id[0];
    let survey = {};
    if(hash) {
        const data = await axios.get(`https://${hash}.ipfs.4everland.io`)
        survey = data.data;
    }
    return {
      props: {
        survey: JSON.stringify(survey),
        surveyHash: hash,
      }, // will be passed to the page component as props
    }
  }