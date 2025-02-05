import app from "./app.js";

const port = process.env.PORT || 9000;

// Create the HTTP server



const server = app.listen(port, () => console.log("Server listening to", port));

// Remove WebSocket integration from index.js
// WebSocket integration will be handled in esp32.routes.js
