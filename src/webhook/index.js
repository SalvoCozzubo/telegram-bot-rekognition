const { getLabels } = require('./rekognition');
const { downloadPicture, sendMessage } = require('./telegram');

const { KEYWORD } = process.env;

const findImageWithBestQuality = (photos) => {
  const { fileId } = photos.reduce((acc, item) => {
    if (item.file_size > acc.fileSize) {
      acc.fileSize = item.file_size;
      acc.fileId = item.file_id;
    }

    return acc;
  }, { fileId: undefined, fileSize: 0 });

  return fileId;
};

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const userId = body.message.chat.id;

  if (!body.message.photo) {
    return {
      statusCode: 200,
      body: '',
    };
  }

  const fileId = findImageWithBestQuality(body.message.photo);
  const picture = await downloadPicture(fileId);
  const labels = await getLabels(picture);

  const label = labels.find((item) => item.Name === KEYWORD);

  if (label) {
    await sendMessage({
      userId,
      message: `It's a ${KEYWORD}`,
    });
  } else {
    await sendMessage({
      userId,
      message: `It's not a ${KEYWORD}`,
    });
  }

  return {
    statusCode: 200,
    body: '',
  };
};
