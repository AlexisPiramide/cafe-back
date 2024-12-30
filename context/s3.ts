import AWS from "aws-sdk";
import fs from "fs";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const uploadFile = (fileName: string) => {
    fs.readFile(fileName, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) throw err;
        const params = {
            Bucket: "testBucket",
            Key: "image.png", 
            Body: data,
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`);
        });
    });

    return true;
};



export {uploadFile}; ;