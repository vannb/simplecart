import http from 'http';
import app from './app';

import { SERVER_PORT } from './constants';

app.set('port', SERVER_PORT);
app.server = http.createServer(app);
app.server.listen(SERVER_PORT);
app.server.on('error', err => console.log(err));
app.server.on('listening', () => console.log(`Listening on ${SERVER_PORT}`));
