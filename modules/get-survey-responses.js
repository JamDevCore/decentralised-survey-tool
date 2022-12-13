import { S3 } from "@aws-sdk/client-s3";
import axios from 'axios';


const getSurveyResponses = async (surveyId) => {
    try {
    const s3 = new S3({
        endpoint:  process.env['4EVERLAND_ENDPOINT'],
        signatureVersion: "v4",
        credentials: {
          accessKeyId:  process.env['EVERLAND_API'],
          secretAccessKey:  process.env['EVERLAND_API_SECRET'],
        },
        region: "us-west-2",
      });
      const data = await s3.headObject({
        Bucket: "responses",
        Key: surveyId
    });
    const json = await axios.get(`https://${data.Metadata['ipfs-hash']}.ipfs.4everland.io`)
    return { results: json.data, resultsHash: data.Metadata['ipfs-hash'] }
    } catch(err) {
        console.log(err)
    }
}

export default getSurveyResponses