import express from 'express';
import cors from 'cors';
import { checker } from '../middlewares/auth';
import body_parser from 'body-parser';
import openRoutes from '../router/open.routes';
import proctectedRoutes from '../router/proctected.routes';
import env from './environment';

const app = express();

// setting cros
app.use(cors({ origin: '*' }));

//configuring body parse
app.use(body_parser.json({ limit: '10mb' }));
app.use(body_parser.urlencoded({ limit: '10mb', extended: true }));

//adding open routes;
app.use(openRoutes);

//adding auth handler
app.use(checker);

//adding protected routes
app.use(proctectedRoutes);

const start = () => app.listen(env.port, () => console.log(`server up 🙂 \nport: ${env.port}`));

export default start


