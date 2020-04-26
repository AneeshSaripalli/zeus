import React from 'react';
import "./MapPin.css"

type IProps = {
    lat: number;
    lng: number;
    text: string;
}

const HousePin: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (<div className="map-pin">

    </div>)
}

export default HousePin;