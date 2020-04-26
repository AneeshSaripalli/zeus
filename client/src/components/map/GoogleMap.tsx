import axios, { AxiosResponse } from 'axios';
import GoogleReactMap from 'google-map-react';
import React from 'react';
import { ConsumptionScore } from '../../../../types/dist';
import MapPin from './pin/MapPin';


export type ScoreRanking = {
    scores: ConsumptionScore[],
    self: {
        id: string
    },
    ranking: number
}


type IProps = {
    data: ScoreRanking
}

const getGradientColor = (start_color: string, end_color: string, percent: number) => {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (start_color.length == 3) {
        start_color = start_color.replace(/(.)/g, '$1$1');
    }

    if (end_color.length == 3) {
        end_color = end_color.replace(/(.)/g, '$1$1');
    }

    // get colors
    const start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);

    const end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);

    // calculate new color
    let diff_red = end_red - start_red;
    let diff_green = end_green - start_green;
    let diff_blue = end_blue - start_blue;

    let diff_red_str = ((diff_red * percent) + start_red).toString(16).split('.')[0];
    let diff_green_str = ((diff_green * percent) + start_green).toString(16).split('.')[0];
    let diff_blue_str = ((diff_blue * percent) + start_blue).toString(16).split('.')[0];

    // ensure 2 digits by color
    if (diff_red_str.length == 1) diff_red_str = '0' + diff_red
    if (diff_green_str.length == 1) diff_green_str = '0' + diff_green
    if (diff_blue_str.length == 1) diff_blue_str = '0' + diff_blue

    return '#' + diff_red_str + diff_green_str + diff_blue_str;
};

const GoogleMap: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [mapLoad, setMapLoad] = React.useState<boolean>(false);
    const data = props.data.scores;


    const renderPins = () => {
        if (data === undefined || mapLoad === false) {
            return <></>
        }

        const colors: string[] = []

        const start = '#ff0000';
        const end = '#f0ff00';

        for (let i = 0; i < data.length; ++i) {
            colors.push(getGradientColor(start, end, i / data.length));
        }

        return data.map((userData, idx) => {
            return <MapPin key={`${userData.uid}`} lat={userData.coords.lat} lng={userData.coords.lng} color={getGradientColor(start, end, idx / data.length)} text="Marker 1" />
        })
    }
    const mapPins = data?.map

    return (<div style={{ height: '500px' }} className="fadein">
        <GoogleReactMap
            bootstrapURLKeys={{ key: 'AIzaSyAwQMP10DBDYDQXkdeJjya6QFTNeso3YEU' }}
            defaultCenter={{ lat: 32.776665, lng: -96.796989 }}
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={14}
            onGoogleApiLoaded={() => setMapLoad(true)}
        >
            {renderPins()}
        </GoogleReactMap>
    </div>)

}

export default GoogleMap;