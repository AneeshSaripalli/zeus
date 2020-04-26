import csv from 'csv-parse';
import fs from 'fs';
import node_geocoder from 'node-geocoder';
import keys from '../config';
import DataMapper from '../database/DataMapper'
import User from '../models/User';
import { v4 } from 'uuid'

let cnt: number = -1;
const maxCnt: number = 1000;

const geocoder = node_geocoder({
    provider: "google",
    apiKey: keys.google_maps_api_key,
});

const parser = csv({
    delimiter: ",",
    auto_parse: true
});

fs.createReadStream('./data/dallas.csv')
    .pipe(parser)
    .on('data', (row: string[]) => {
        parser.pause()
        const lng: number = +row[0];
        const lat: number = +row[1];
        const number: number = +row[2];
        const street: string = row[3].toString();

        if (cnt >= maxCnt) {
            process.exit(0);
        }
        ++cnt;

        const addr: string = `${number} ${street}`

        console.log(cnt, lng, lat, number, street)

        if (cnt !== 0) {
            geocoder.geocode(`${number} ${street}, Dallas, Texas`).then(results => {
                const top = results[0];
                console.log(results[0])
                const object = Object.assign<User, User>(new User, {
                    id: v4(),
                    address: top.formattedAddress!,
                    zip: top.zipcode!,
                    consumption: [['electricity', Math.random() * 2000]],
                    lat,
                    lng
                })

                DataMapper.put(object).then(() => {
                    parser.resume()
                });
            });
        } else {
            parser.resume();
        }
    })
