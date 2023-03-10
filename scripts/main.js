const http = require("http")

const oa = 10
const ob = 13
const url = `http://localhost:8080/v1/calculation/?operation=addition&oa=${oa}&ob=${ob}`

async function run() {
  console.log("Making http request...")
  http.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        const parsedData = rawData;
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

run()