// Get dependencies
const express    = require('express');
const path       = require('path');
const http       = require('http');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = '3308';
app.set('port', port);

/**
 * Create HTTP && HTTPS server.
 */
// const server = http.createServer(app);
let server;

server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on http://localhost:${port}`));

//Node server - NPM start
//Port  - 3306 
//build/index.html 
//Local test
// NOde ke through server karna hai. 