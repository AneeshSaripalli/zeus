import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Row from 'antd/es/row';
import { Col } from 'antd/es/grid';

type IReduxDispatchProps = {

}

type IReduxStateProps = {
    jwt: string
}


type IProps = IReduxDispatchProps & IReduxDispatchProps & RouteComponentProps;

const Profile: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (<div>
        <Row justify="center">
            <Col span={18} className="text-center clr-accent">
                hello there
            </Col>
        </Row>
    </div>);
}

export default Profile