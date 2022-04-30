const { TELEGRAM_API_TOKEN } = process.env;
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;
const TELEGRAM_FILE_URL = `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN}`;

module.exports = {
  TELEGRAM_URL,
  TELEGRAM_FILE_URL,
};
