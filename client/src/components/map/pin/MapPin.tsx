import Modal from 'antd/es/modal';
import React from 'react';
import { ConsumptionScore } from '../../../../../types/dist';
import "./MapPin.css";

type IProps = {
    lat: number;
    lng: number;
    text: string;
    ptData: ConsumptionScore;
    color: string;
    total: number;
}

const HousePin: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [clicked, setClicked] = React.useState<boolean>(false);

    let content = <></>;

    if (clicked) {
        content = <Modal onCancel={() => setClicked(false)}
            closable
            visible={clicked}
            title="Resource Consumption"
        >
            <p className="text fw-400" style={{ textTransform: 'capitalize', color: 'black' }}>
                {props.ptData.utility} consumption is {props.ptData.consumption.toFixed(2)}. <br />
                Ranked {props.ptData.ranking} out of {props.total}
            </p>
        </Modal>
    }

    return (<div onClick={() => setClicked(!clicked)} className="map-pin" style={{ backgroundColor: props.color }}>
        {content}
    </div>)
}

export default HousePin;