import React from 'react';
import "./MapPin.css"

type IProps = {
    lat: number;
    lng: number;
    text: string;
    color: string;
}

const HousePin: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (<div className="map-pin" style={{ backgroundColor: props.color }}>

    </div>)
}

export default HousePin;