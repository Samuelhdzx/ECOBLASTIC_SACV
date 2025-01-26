import { app, httpServer } from './app.js';

const port = process.env.PORT || 1337;

httpServer.listen(port, () => {
    console.log(`Server on port ${port}`);
});
