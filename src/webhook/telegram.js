const axios = require('axios');

const { TELEGRAM_URL, TELEGRAM_FILE_URL } = require('./config');

const getFileFromTelegram = async (fileId) => {
  const picPhotoUrl = `${TELEGRAM_URL}/getFile`;

  const params = {
    url: picPhotoUrl,
    data: {
      file_id: fileId,
    },
    method: 'POST',
  };

  const response = await axios(params);
  console.log('response', JSON.stringify(response.data, null, 2));
  return response.data.result.file_path;
};

const downloadPicture = async (fileId) => {
  const filePath = await getFileFromTelegram(fileId);

  console.log('filePath', `${TELEGRAM_FILE_URL}/${filePath}`);

  const response = await axios({
    url: `${TELEGRAM_FILE_URL}/${filePath}`,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  return Buffer.from(response.data);
};

const sendMessage = async ({ userId, message }) => {
  const url = `${TELEGRAM_URL}/sendMessage`;

  const params = {
    url,
    method: 'POST',
    data: {
      chat_id: userId,
      text: message,
    },
  };

  await axios(params);
};

module.exports = {
  getFileFromTelegram,
  downloadPicture,
  sendMessage,
};
