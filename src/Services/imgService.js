// eslint-disable-next-line no-undef
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dpares9ra',
    api_key: '128933839844739',
    api_secret: 'Z-1tfmtHGC5maxQPdRLKtsh3UtU',
    secure: true,
  });

const uploadImg = async () => {
    // console.log(process)
    // const result = await cloudinary.uploader.upload(image);
    // console.log(result)
}

export default {
    uploadImg,
}