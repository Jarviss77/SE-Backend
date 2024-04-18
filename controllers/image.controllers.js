import { getObjectUrl, s3Client } from '../config/aws.config.js';
import { response_500, response_200 } from '../utils/statuscodes.utils.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

export async function imageupload(req, res){
    try {
        const key = req.user.id;
        const upload = multer({
            storage: multerS3({
                s3: s3Client,
                bucket: process.env.AWS_BUCKET_NAME,
                acl: 'private',
                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key: function (req, file, cb) {
                    cb(null, 'uploads/displaypictures/' + key + '.jpeg');
                }
            })
        }).single('image');

        upload(req, res, function (err) {
            if (err) {
                return response_500(res, 'Error uploading image:', err);
            }
            return response_200(res, 'Image uploaded successfully');
        });
    }
    catch (error) {
        response_500(res, 'Error uploading image:', error);
    }
}

export async function getimage(req, res){
    try {
        const key = req.user.id;
        const url = await getObjectUrl(key + '.jpeg');
        return response_200(res, 'Image fetched successfully', url);
    }
    catch (error) {
        response_500(res, 'Error fetching image:', error);
    }
}
