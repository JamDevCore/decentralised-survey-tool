import rateLimit from '../../modules/api-rate-limit';
import checkNewSurvey from '../../modules/check-new-survey'
import pinFile from '../../modules/pin-file';

export default async function handler(req, res) {
    try {
        await rateLimit(res, 10, 'CACHE_TOKEN') // 10 requests per minute
        if (req.method === 'POST') {
    
            const survey = await checkNewSurvey(req, res)
            const data = await pinFile(req, res, survey, 'survey')

            res.status(200).json({ message: 'File succesfully save to IPFS', hash: data.hash, surveyId: data.surveyId });
        } else {
            res.status(404).json({ message: 'Incorrect method'})
        }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Error occured. Please contact admin'})
    }
  }