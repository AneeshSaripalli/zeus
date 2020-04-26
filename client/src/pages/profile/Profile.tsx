import { Col } from 'antd/es/grid';
import Row from 'antd/es/row';
import axios from 'axios';
import GoogleReactMap from 'google-map-react';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { checkLSForJWT } from '../../redux/actions/main';
import { GlobalState, MainReducerName } from '../../redux/types';
import "./Profile.css";

type IReduxDispatchProps = {
    loadJWT: () => void;
}

type IReduxStateProps = {
    jwt: string | null
}


type IProps = IReduxStateProps & IReduxDispatchProps & RouteComponentProps;

const Profile: React.FC<IProps> = (props: IProps): JSX.Element => {
    React.useEffect(() => {
        if (props.jwt === null) {
            console.log('checking local storage')
            console.log(localStorage.getItem('jwt'))
            // props.history.push('/');
            props.loadJWT();
        } else {
            navigator.geolocation.getCurrentPosition(position => {
                const { longitude, latitude } = position.coords;
                axios.post('/api/location', {}, {
                    params: {
                        jwt: props.jwt,
                        location: {
                            lat: latitude,
                            lng: longitude
                        }
                    }
                });
            });
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

const mapDispatchToProps = (dispatch: any): IReduxDispatchProps => {
    return {
        loadJWT: dispatch(checkLSForJWT)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);