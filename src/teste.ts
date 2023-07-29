import express, { Request, Response, NextFunction } from 'express';

// Initialize Express app
const app = express();
const port = 3000;

// Mock function to check database availability (replace this with your actual implementation)
function isDatabaseAvailable(): boolean {
    // Implement your logic to check database availability.
    // For example, try to connect to the database and return true if successful.
    return true;
}

// Fila para armazenar os requests
const requestQueue: Request[] = [];
let databaseReady = false;

// Middleware to check database availability and queue requests
function checkDatabaseAvailability(req: Request, res: Response, next: NextFunction): void {
    if (databaseReady) {
        next();
    } else {
        requestQueue.push(req);
        res.status(503).send('Service Unavailable: Database is not ready.');
    }
}

// Endpoint to start processing the queue (this should be a protected endpoint in your actual app)
app.get('/processQueue', (req: Request, res: Response) => {
    if (databaseReady) {
        while (requestQueue.length > 0) {
            const request = requestQueue.shift();
            if (request) {
                // Process the request or call your API's request handling function
                console.log(`Processing request: ${request.method} ${request.url}`);
            }
        }
        res.send('Request queue processed successfully.');
    } else {
        res.status(503).send('Service Unavailable: Database is not ready.');
    }
});

// Endpoint to simulate database startup (this should be part of your actual startup logic)
app.get('/startDatabase', (req: Request, res: Response) => {
    // Simulate database startup
    databaseReady = true;
    res.send('Database started successfully.');
});

// Example endpoint that requires database availability to handle requests
app.get('/', checkDatabaseAvailability, (req: Request, res: Response) => {
    // Handle your normal request logic here
    res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
