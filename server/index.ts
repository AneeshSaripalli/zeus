import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import bodyParser from 'body-parser';

const PORT: number = Number(process.env.PORT) || 8000;

const app: express.Application = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request: express.Request, response: express.Response) => {
    return response.status(200).json({
        response: 'Response'
    });
})

app.listen(PORT, () => {
    console.log('Server running on', PORT);
});