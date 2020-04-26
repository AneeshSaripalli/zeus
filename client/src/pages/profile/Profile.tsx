import { Col } from 'antd/es/grid';
import Row from 'antd/es/row';
import axios, { AxiosResponse } from 'axios';
import GoogleReactMap from 'google-map-react';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { checkLSForJWT } from '../../redux/actions/main';
import { GlobalState, MainReducerName } from '../../redux/types';
import "./Profile.css";
import GoogleMap, { ScoreRanking } from '../../components/map/GoogleMap';
import { ConsumptionScore } from '../../../../types/dist';

type IReduxDispatchProps = {
    loadJWT: () => void;
}

type IReduxStateProps = {
    jwt: string | null
}


type IProps = IReduxStateProps & IReduxDispatchProps & RouteComponentProps;

const Profile: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [data, setData] = React.useState<ScoreRanking>();

    React.useEffect(() => {
        if (data === undefined) {
            axios.get('/api/all', {
                params: {
                    jwt: localStorage.getItem('jwt')
                }
            }).then((response: AxiosResponse<{
                response: ScoreRanking
            }>) => {
                const { scores } = response.data.response;
                console.info(scores.length);
                setData(response.data.response);
            })
        }
    })

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

    const renderMap = () => {
        if (data === undefined) {
            return <></>
        }

        return <GoogleMap data={data} />
    }

    const renderBody = () => {
        if (data === undefined) {
            return (<div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
                <div className="title fw-600 font-xlg" id="profile">
                    Profile
                    </div>
            </div>);
        }

        const { ranking } = data;

        const color: string = (ranking < 20) ? "#01BEFE" : (ranking <= 75) ? "#FF7D00" : "black"

        return (<div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
            <div className="title fw-600 font-xlg" id="profile">
                Profile
                    </div>
            <div className="flex-grow" />
            <div className="title fw-600 font-xlg fadein" style={{ color: color }}>
                {data.ranking.toFixed(0)}th percentile
            </div>
        </div>);
    }

    return (<Row justify="center">
        <Col span={8} className="clr-accent" style={{ paddingTop: "50px", paddingLeft: '20px' }}>
            {renderBody()}
            {renderMap()}
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