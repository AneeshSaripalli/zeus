import { Col } from 'antd/es/grid';
import Row from 'antd/es/row';
import Spin from 'antd/es/spin';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import GoogleMap, { ScoreRanking } from '../../components/map/GoogleMap';
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
    const [data, setData] = React.useState<ScoreRanking>();
    const [localOnly, setLocalOnly] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (data === undefined) {
            const url: string = localOnly ? '/api/nearby' : '/api/all';

            axios.get(url, {
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
            return <div className="rounded ant-card-loading-block flexbox flex-row flex-center" style={{ height: '500px', }}>
                <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} className="h-center"><Spin size='large' /></div>
            </div>
        }

        return <GoogleMap toggleView={() => {
            setData(undefined);
            setLocalOnly(!localOnly)
        }}
            localOnly={localOnly}
            data={data} />
    }

    const rank = (ranking: number): [string, string, string] => {
        if (ranking < 20) {
            return ["You're doing AMAZING!", "#01BEFE", "Keep doing what you've been doing to get your rebate!"]
        } else if (ranking <= 75) {
            return ["You're doing your part", "#FF7D00", "You're so close - try turning off some lights around the house."];
        } else {
            return ["Thanks for trying! Let's see how we can improve.", "black", "You may want to check out our energy saving suggestions!"];
        }
    }

    const renderBody = () => {
        if (data === undefined) {
            return (<div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
                <div className="title font-xlg" id="profile">
                    Profile
                </div>
                <div className="flex-grow" />
                <div className="title fw-600 font-xlg ant-card-loading-block rounded" style={{ width: 200 }} />
            </div>);

        }

        const { ranking } = data;

        const details = rank(ranking);

        const color: string = details[1]

        return (<div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
            <div className="title font-xlg" id="profile">
                Profile
            </div>
            <div className="flex-grow" />
            <div className="title fw-600 font-xlg" style={{ color: color }}>
                {data.ranking.toFixed(0)}th percentile
            </div>
        </div>);
    }

    const renderMiddle = () => {
        if (data === undefined) {
            return (<div style={{ height: '200px' }}>
            </div>)
        }

        const { ranking } = data;
        const details = rank(ranking);

        return (
            <>
                <div className="flexbox flex-column flex-center" style={{ height: '200px' }}>
                    <div className='flex-grow' />
                    <div className="flexbox flex-row flex-center fadein" style={{ marginBottom: '20px' }}>
                        <div className="flex-grow font-xlg rounded pd-sm clr-white title h-center" style={{ textAlign: 'center', background: details[1] }}>
                            {details[0]}
                        </div>
                    </div>
                    <div className="clr-black fw-600 text">
                        {details[2]}
                    </div>
                    <div className="flex-grow" />
                </div>
            </>
        )
    }

    return (<Row justify="center">
        <Col span={8} className="clr-black" style={{ paddingTop: "50px", paddingLeft: '20px' }}>
            {renderBody()}
            {renderMiddle()}
            <div className="flexbox flex-row" style={{ alignItems: 'flex-end' }} >
                <div className="title font-xlg" id="standings">
                    Standings
                </div>
                <div className="flex-grow" />
                <div className="title font-xlg" >
                    <span className="clr-black">Prize pool </span>
                    <span className="clr-white rounded fw-600 pd-sm" style={{ backgroundColor: '#FF4136' }}>$500</span>
                </div>
            </div>

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