import { Col } from 'antd/es/grid';
import Row from 'antd/es/row';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import "./Profile.css";
import Descriptions from 'antd/es/descriptions';
import { GlobalState, MainReducerName } from '../../redux/types';
import { connect } from 'react-redux';
import GoogleReactMap from 'google-map-react';
type IReduxDispatchProps = {

}

type IReduxStateProps = {
    jwt: string | null
}


type IProps = IReduxStateProps & IReduxDispatchProps & RouteComponentProps;

const Profile: React.FC<IProps> = (props: IProps): JSX.Element => {
    React.useEffect(() => {
        if (props.jwt === null) {
            props.history.push('/');
        }
    })

    return (<Row justify="center">
        <Col span={8} className="clr-accent" style={{ paddingTop: "50px", paddingLeft: '20px' }}>
            <div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
                <div className="title fw-600 font-xlg" id="profile">
                    Profile
                    </div>
                <div className="flex-grow" />
                <div className="title fw-600 font-xlg clr-black">
                    User Name
                    </div>
            </div>
            {/* <Descriptions className="body">
                    <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                   </Descriptions.Item>
                </Descriptions> */}
            <div style={{ height: '500px' }}>
                <GoogleReactMap
                    bootstrapURLKeys={{ key: 'AIzaSyAwQMP10DBDYDQXkdeJjya6QFTNeso3YEU' }}
                    defaultCenter={{ lat: 32.776665, lng: -96.796989 }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultZoom={13}
                />
            </div>
        </Col>
    </Row >);
}

const mapStateToProps = (state: GlobalState): IReduxStateProps => {
    return {
        jwt: state[MainReducerName].jwt
    }
}

export default connect(mapStateToProps, null)(Profile);