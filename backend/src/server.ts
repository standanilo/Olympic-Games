import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import countriesRouter from './routes/countries.routes';
import athletesRouter from './routes/athletes.routes';
import sportsRouter from './routes/sports.routes';
import disciplinesRouter from './routes/disciplines.routes';
import competitionsRouter from './routes/competitions.routes';
import recordsRouter from './routes/records.routes';
import requestsRouter from './routes/requests.routes';
import schedulesRouter from './routes/schedules.routes';
import resultsRouter from './routes/results.routes';
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();
router.use('/users', userRouter)
router.use('/countries', countriesRouter)
router.use('/athletes', athletesRouter)
router.use('/sports', sportsRouter)
router.use('/disciplines', disciplinesRouter)
router.use('/competitions', competitionsRouter)
router.use('/records', recordsRouter)
router.use('/requests', requestsRouter)
router.use('/schedules', schedulesRouter)
router.use('/results', resultsRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));