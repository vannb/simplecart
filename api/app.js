import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Route from './routes';

const app = express();
app.use(cors());
// Tell ExpressJS is configured behind proxy
// app.set('trust proxy', process.env.USE_PROXY === 'true');
// app.use(helmet());


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

Route(app);

export default app;
