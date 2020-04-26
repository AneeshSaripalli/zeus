import crypto from 'crypto';
import csv from 'csv-parse';
import fs from 'fs';
import node_geocoder from 'node-geocoder';
import keys from '../config';
import DynamoMapper from '../database/DataMapper';
import User from '../models/User';


const geocoder = node_geocoder({
    provider: "google",
    apiKey: keys.google_maps_api_key,
});

const parser = csv({
    delimiter: ",",
    auto_parse: true
});

type Loc = {
    lng: number;
    lat: number;
    number: number;
    street: string;
}

const buffer: Loc[] = []

fs.createReadStream('./data/dallas.csv')
    .pipe(parser)
    .on('data', async (row: string[]) => {
        const lng: number = +row[0];
        const lat: number = +row[1];
        const number: number = +row[2];
        const street: string = row[3].toString();
        buffer.push({
            lat,
            lng,
            number,
            street
        });

        if (buffer.length >= 1000) {
            parser.pause();
            const results = await geocoder.batchGeocode(buffer.map(({ number, street }) => `${number} ${street}, Dallas, Texas`))

            const objects: (User | null)[] = results.map((result, idx) => {
                const { value } = result;
                if (value === null) return null;
                const top = value[0];

                const object = Object.assign<User, User>(new User, {
                    id: crypto.createHash('md5').update(`${buffer[idx].number},${buffer[idx].street},${buffer[idx].lat},${buffer[idx].lng}`).digest('base64'),
                    address: top.formattedAddress!,
                    zip: top.zipcode!,
                    consumption: [['electricity', Math.random() * 2000]],
                    lat,
                    lng
                })

                return object;
            })


            const filtered: User[] = [];
            objects.forEach(object => {
                if (object !== null) {
                    filtered.push(object);
                }
            });

            console.log(filtered.forEach(v => {
                const len = filtered.filter(w => v.id === w.id).length
                if (len !== 0) {
                    console.log(len, v.id);
                }
            }));

            const iter = DynamoMapper.batchPut(filtered);

            for await (const result of iter) { }

            buffer.splice(0, buffer.length);

            parser.resume();
        }
    })
