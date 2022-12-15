import { S3 } from "@aws-sdk/client-s3";
import axios, { all } from "axios";
import { v4 as uuidv4 } from 'uuid';



const pinFile = async (res, req, survey, type) => {
  try {
    const s3 = new S3({
        endpoint:  process.env['EVERLAND_ENDPOINT'],
        signatureVersion: "v4",
        credentials: {
          accessKeyId:  process.env['EVERLAND_API'],
          secretAccessKey:  process.env['EVERLAND_API_SECRET'],
        },
        region: "us-west-2",
      });
    if(type === 'survey') {
        // Upload survey
        const keySurvey = uuidv4()
        var buf = Buffer.from(JSON.stringify(survey));
        await s3.putObject({
            Bucket: "surveys",
            Key: keySurvey,
            Body: buf,
          });
        const data = await s3.headObject({
            Bucket: "surveys",
            Key: keySurvey
        });

        // Upload empty response file
        const buffer = Buffer.from(JSON.stringify({ responses: []}));

        const blankResponses = await s3.putObject({
            Bucket: "responses",
            Key: survey.surveyId,
            Body: buffer,
          });
        return { hash: data.Metadata['ipfs-hash'], surveyId: survey.surveyId }

    } else {
        // Get survey document 
        // merge responses
        // delete old object
        // upload new object

        // Needs testing but we may be at risk of losing responses due to timing on deletion of old set and merge with new.
        // We could delay all this and do the merge only x seconds after a submission to lower the risk of simultaneous
        // Or stop being so fixed on no database :D 

        const responseData = await s3.headObject({
            Bucket: "responses",
            Key: survey.response.surveyId
        });
        let allData = await fetch(`https://${responseData.Metadata['ipfs-hash']}.ipfs.4everland.io`);
        let responses;
        if (allData.ok) { // if HTTP-status is 200-299
          responses = await allData.json();
          responses.responses = responses.responses.concat(survey.response);
      }
       


        var buf = Buffer.from(JSON.stringify(responses));
        await s3.deleteObject({
            Bucket: 'responses',
            Key: survey.response.surveyId,
          });
        const res = await s3.putObject({
            Bucket: "responses",
            Key: survey.response.surveyId,
            Body: buf,
          });
          const data = await s3.headObject({
            Bucket: "responses",
            Key: survey.response.surveyId
        });
        return {hash: data.Metadata['ipfs-hash'], surveyId: survey.response.surveyId }
    }
  } catch (err) {
    console.log(err);
  }
};

export default pinFile;



