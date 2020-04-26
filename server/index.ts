import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import NodeGeocoder from 'node-geocoder';
import { ConsumptionScore } from '../types/dist';
import keys from './config';
import DynamoMapper from './database/DataMapper';
import User from './models/User';
import { OAuthUser } from './types/OAuthUser';


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


app.get('/api/all', JWTMiddleware, async (request: express.Request, response: express.Response) => {
    const profile: OAuthUser = response.locals.user;
    const reqUser = await DynamoMapper.get<User>(Object.assign<User, Partial<User>>(new User, {
        id: profile.uid
    }));


    const users: User[] = [];

    for await (const user of DynamoMapper.scan<User>(User)) {
        users.push(user);
    }


    const scores: ConsumptionScore[] = users.sort((u1, u2) => u1.consumption[0][1] - u2.consumption[0][1]).map((user, idx) =>
        ({
            consumption: user.consumption[0][1],
            ranking: idx,
            uid: user.id,
            utility: 'electric',
            coords: {
                lat: user.lat,
                lng: user.lng
            }
        })
    );

    const ranking: number = 100 * bs(scores, reqUser.consumption[0][1]) / scores.length;


    return response.status(200).json({
        response: {
            scores: scores.slice(0, 1000),
            self: reqUser,
            ranking
        }
    });
})

const bs = (scores: ConsumptionScore[], cons: number): number => {
    let start = 0;
    let end = scores.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        if (scores[mid].consumption === cons) return mid;

        if (scores[mid].consumption < cons) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return start;
}

app.get('/api/nearby', JWTMiddleware, async (request: express.Request, response: express.Response) => {
    const profile: OAuthUser = response.locals.user;

    const reqUser = await DynamoMapper.get<User>(Object.assign<User, Partial<User>>(new User, {
        id: profile.uid
    }));

    const users: User[] = [];

    console.log('Request for', reqUser.zip)

    for await (const record of DynamoMapper.scan<User>(User, {
        filter: {
            subject: 'zip',
            type: 'Equals',
            object: reqUser.zip
        }
    })) {
        users.push(record);
    }

    const scores: ConsumptionScore[] = users.sort((u1, u2) => u1.consumption[0][1] - u2.consumption[0][1]).map((user, idx) =>
        ({
            consumption: user.consumption[0][1],
            ranking: idx,
            uid: user.id,
            utility: 'electric',
            coords: {
                lat: user.lat,
                lng: user.lng
            }
        })
    );

    const ranking: number = 100 * bs(scores, reqUser.consumption[0][1]) / scores.length;

    return response.status(200).json({
        response: {
            scores: scores,
            self: reqUser,
            ranking
        }
    });
})

app.post('/api/location', JWTMiddleware, async (request: express.Request, response: express.Response) => {
    console.log(response.locals.user);
    const loc: {
        lat: number,
        lng: number
    } = JSON.parse(request.query.location.toString());

    const user: OAuthUser = response.locals.user;

    let userExists: boolean = false;

    try {
        await DynamoMapper.get<User>(Object.assign<User, Partial<User>>(new User, {
            id: user.uid
        }))
        userExists = true;
    } catch (e) {

    }

    if (!userExists) {
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
    }


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