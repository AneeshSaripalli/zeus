import GoogleReactMap from 'google-map-react';
import React from 'react';
import MapPin from './pin/MapPin';
import axios, { AxiosResponse } from 'axios';

import { ConsumptionScore } from '../../../../types/dist'

type IProps = {

}


const GoogleMap: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [data, setData] = React.useState<ConsumptionScore[]>([]);
    const [mapLoad, setMapLoad] = React.useState<boolean>(false);

    React.useEffect(() => {
        axios.get('/api/nearby', {
            params: {
                jwt: localStorage.getItem('jwt')
            }
        }).then((response: AxiosResponse<{ response: ConsumptionScore[] }>) => {
            const scores = response.data.response;
            console.info(scores.length);
            setData(scores);
        })
    })

    const comp = mapLoad ? <MapPin lat={32.776665} lng={-96.796989} text="Marker 1" /> : <></>

    return (<div style={{ height: '500px' }}>
        <GoogleReactMap
            bootstrapURLKeys={{ key: 'AIzaSyAwQMP10DBDYDQXkdeJjya6QFTNeso3YEU' }}
            defaultCenter={{ lat: 32.776665, lng: -96.796989 }}
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={14}
            onGoogleApiLoaded={() => setMapLoad(true)}
        >
            {comp}
        </GoogleReactMap>
    </div>)

}

export default GoogleMap;