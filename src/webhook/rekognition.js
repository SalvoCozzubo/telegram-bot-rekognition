const { RekognitionClient, DetectLabelsCommand } = require('@aws-sdk/client-rekognition');

const client = new RekognitionClient({});

const getLabels = async (picture) => {
  const params = {
    Image: {
      Bytes: picture,
    },
    MaxLabels: 20,
    MinConfidence: 75,
  };

  const response = await client.send(new DetectLabelsCommand(params));
  return response.Labels;
};

module.exports = { getLabels };
