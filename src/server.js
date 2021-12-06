const app = require('./app');

const { PORT, HOST } = require('./common/config');

const start = async () => {
  try {
    await app.listen(PORT, HOST);
    console.log(`App is running on: http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1)
  }
}

start();