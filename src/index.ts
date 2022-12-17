import express from 'express';
import routes from './routes/index';


const app = express();
const port = 3000;


app.use('/api', routes);

app.listen(port, async () => {
    await console.log(`server started at localhost:${port}`);
});


export default app;


