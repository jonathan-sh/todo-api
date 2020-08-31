import startApp from './config/express';
import startMongoDb from './config/mongo';

startMongoDb()
    .then(() => startApp())
    .catch( (error) => {
        console.log(error);
        console.log('¯ \ _ (ツ) _ / ¯');
    })