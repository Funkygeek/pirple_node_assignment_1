/*
 * Primary file for the Hello API
 *  https://pirple.thinkific.com
 *  Assignment 1
 *
 *
 *  Basically supports a single route: /hello
 *  It returns a welcome message.
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the Query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toLocaleLowerCase();

    // Get the headers as an Object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();

        // choose the handler that this request should go to.  If not found
        // then go to the not found handler
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            // Use the payload handled by the handler or default to and empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log("Returning this response:", statusCode, payloadString);
        });

    });
});

// Start the server, and have it listen
httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort} as ${config.envName}`);
});

// Define the handlers
let handlers = {};

// Ping handlers
handlers.hello = (data, callback) => {
    const welcomeMessage = {
        'message': 'Welcome to the super simple API created for assignment 1'
    };
    callback(200, welcomeMessage);
};


// Not Found Handler
handlers.notFound = (data, callback) => {
    callback(404, {});
};
// Define a request router
const router = {
    'hello': handlers.hello
};