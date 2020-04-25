import bodyParser from 'body-parser';
import cors from 'cors';
import express, { response } from 'express';
import jwt from 'jsonwebtoken';

const PORT: number = 8000;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request: express.Request, response: express.Response) => {
    return response.status(200).json({
        response: 'Response'
    });
})

app.post('/api/location', (request: express.Request, response: express.Response) => {
    console.log(request.query);
    return response.status(200).json({
        response: 'dummy response'
    })
})

app.get('/api/jwt', (request: express.Request, response: express.Response) => {
    if (request.query.account !== undefined) {
        console.log('Found account var');
        const signedJWT: string = jwt.sign(request.query.account, 'somequerysecretkeyherewhichisclearlynotproductionreadyandshouldnotbeUs3dIntheFuture')

        console.log('Returning signed', signedJWT);

        return response.status(200).json({
            response: signedJWT
        })
    }

    console.log('JWT is missing from the parsing request.');

    return response.status(400).json({ error: 'Query paramter account needs to be present on the URL.' });
})

app.listen(PORT, () => {
    console.log('Server running on', PORT);
});