import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from 'uuid';



const pinFile = async (res, req, survey, type) => {
  try {
    if(type === 'survey') {
        const s3 = new S3({
            endpoint:  process.env['4EVERLAND_ENDPOINT'],
            signatureVersion: "v4",
            credentials: {
              accessKeyId:  process.env['4EVERLAND_API'],
              secretAccessKey:  process.env['4EVERLAND_API_SECRET'],
            },
            region: "us-west-2",
          });
        const key = uuidv4()
        var buf = Buffer.from(JSON.stringify(survey));
        const putObjectOutput = await s3.putObject({
            Bucket: "surveys",
            Key: key,
            Body: buf,
          });
          const data = await s3.headObject({
            Bucket: "surveys",
            Key: key
        });
        return data.Metadata['ipfs-hash'];
    }
  } catch (err) {
    console.log(err);
  }
};

export default pinFile;



