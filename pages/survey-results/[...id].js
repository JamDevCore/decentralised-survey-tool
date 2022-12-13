import axios from 'axios';
import {useEffect, useState} from 'react';
import {FaPaperPlane, FaCopy} from 'react-icons/fa'
import { saveResponses } from '../../modules/save-responses';
import copyToClipboard from '../../modules/copy-to-clipboard';
import getSurveyResponses from '../../modules/get-survey-responses';


export default function TakeSurvey({ survey, surveyHash , results, surveyId, resultsHash }) {
    const [responseHash, setResponseHash] = useState('');
    const parsedResults = JSON.parse(results)
    useEffect(() => {
      console.log('Thanks for using my DecentSurvey tool fellow dev! Feedback and tips can be sent to hello@web3rockstars.io')
  }, [])
    return (
        <>
        <div>
        <main className="px-2 py-16">

       <h1 className="text-3xl font-bold underline text-center my-4">
            {survey?.survey?.title || "DecentSurveys"}
         </h1> 
         <div className="text-center w-full md:w-1/2 mx-auto mt-4">
         <p>
            DecentSurveys are anonymous, decentralised surveys and questionnaires. We don't own any of this data. All responses are publically available via the hash on IPFS, a peer to peer file storage system.<span className="underline font-bold block my-4"> No email, no signup. Just surveys.</span>
            </p>
            <a className="text-indigo-500 text-center block" href="/">Build your own survey <span className="underline">here!</span></a>
            </div>
         <ul role="list" className="space-y-3 w-full md:w-1/2 mx-auto mt-16">
            {parsedResults && parsedResults?.responses.map((response, index) => (
              <li key={response.responseId} className="overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
                <ul>
                  <p className="text-xs">ID: {response.responseId}</p>
                  {response?.questions.map((q, i) => {
                    return (
                      <li key={q._id} className={`py-4 ${i !== 0 && 'border-t border-gray-300'}`}>
                        <div>
                        <h4>{q.question}</h4>
                        </div>
                        <div className="flex mt-2 flex-wrap w-full">
                          {q.choices.map(c => {
                            console.log(c)
                            return (
                              <span key={c._id} className={`w-full sm:w-48 inline-flex items-center rounded-md my-2 ${c.answer ? 'bg-green-100 text-green-800' : 'bg-pink-100 text-pink-800'} px-2.5 py-0.5 text-sm font-medium mr-4`}>
                              <p>{c.value} <span className="font-bold italic">{c.answer ? `: True` : ': False'}</span></p>
                            </span>
                            )

                          })}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
    </ul>
  
         <p className="text-xs text-gray-400 text-center mt-16 underline"> Survey Hash IPFS </p>
         <p className="text-xs text-gray-400 text-center">{surveyHash}</p>
         <p className="text-xs text-gray-400 text-center mt-4 underline">Survey ID </p>
         <p className="text-xs text-gray-400 text-center"> {surveyId}</p>
         <p className="text-xs text-gray-400 text-center mt-4 underline">Responses Hash IPFS </p>
         <p className="text-xs text-gray-400 text-center"> {resultsHash}</p>
        </main>
      
        </div> 
        </>

    )
  }
  export async function getServerSideProps(context) {
    const surveyHash = context?.params?.id[0];
    let survey = {};
    let surveyResults = {};
    let hash = '';
    if(surveyHash) {
        const data = await axios.get(`https://${surveyHash}.ipfs.4everland.io`)
        survey = data.data;
        const response = await getSurveyResponses(survey.surveyId);
        surveyResults = response.results;
        hash = response.resultsHash
    }
    return {
      props: {
        results: JSON.stringify(surveyResults),
        survey: JSON.stringify(survey),
        surveyHash: surveyHash,
        surveyId: survey.surveyId,
        resultsHash: hash,
      }, // will be passed to the page component as props
    }
  }