import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuthUser } from './types/OAuthUser';

import NodeGeocoder from 'node-geocoder';
import keys from './config';
import DynamoMapper from './database/DataMapper';
import User from './models/User';
import { ConsumptionScore } from '../types/dist'

const geocoder = NodeGeocoder({
    provider: "google",
    apiKey: keys.google_maps_api_key,
});

const PORT: number = 8000;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const key: string = 'somequerysecretkeyherewhichisclearlynotproductionreadyandshouldnotbeUs3dIntheFuture';

const JWTMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const token = request.query.jwt;
    if (token === undefined) {
        return response.status(400).json({
            error: "JWT needs to be provided."
        });
    }
    const { displayName, email, photoURL, uid }: OAuthUser = jwt.decode(token.toString()) as OAuthUser;

    const user: OAuthUser = {
        displayName,
        email,
        photoURL,
        uid
    };


    response.locals.user = user;
    return next();
};

app.get('/', (request: express.Request, response: express.Response) => {
    return response.status(200).json({
        response: 'Response'
    });
})

app.get('/api/nearby', JWTMiddleware, async (request: express.Request, response: express.Response) => {
    const profile: OAuthUser = response.locals.user;

    const users: User[] = [];

    for await (const user of DynamoMapper.scan<User>(User, {
        // filter: {}
    })) {
        users.push(user);
    }

    const scores: ConsumptionScore[] = users.sort((u1, u2) => u1.consumption[0][1] - u2.consumption[0][1]).map((user, idx) =>
        ({
            consumption: user.consumption[0][1],
            ranking: idx,
            uid: user.id,
            utility: 'electric'
        })
    );

    return response.status(200).json({ response: scores });
})

app.post('/api/location', JWTMiddleware, (request: express.Request, response: express.Response) => {
    console.log(response.locals.user);
    const loc: {
        lat: number,
        lng: number
    } = JSON.parse(request.query.location.toString());

    const user: OAuthUser = response.locals.user;

    geocoder.reverse({
        lat: loc.lat,
        lon: loc.lng
    }).then(response => {
        const top = response[0];

        const hotel = Object.assign<User, User>(new User, {
            id: user.uid,
            address: top.formattedAddress!,
            consumption: [["electricity", Math.random() * 1000.0]],
            lat: loc.lat,
            lng: loc.lng,
            zip: top.zipcode!
        });

        DynamoMapper.put(hotel);
    })


    return response.status(200).json({
        response: 'dummy response'
    })
});

app.get('/api/jwt', (request: express.Request, response: express.Response) => {
    const { displayName, email, photoURL, uid }: OAuthUser = JSON.parse(request.query.account.toString());

    const user: OAuthUser = {
        displayName,
        email,
        photoURL,
        uid
    };

    const signedJWT: string = jwt.sign(user, key)

    return response.status(200).json({
        response: signedJWT
    })
})

app.listen(PORT, () => {
    console.log('Server running on', PORT);
});