import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { checkLSForJWT, fetchSetJWT } from '../../redux/actions/main';
import { GlobalState, MainReducerName } from '../../redux/types';
import Login from '../login/Login';
import './Header.css';

type IReduxDispatch = {
    fetchSetJWT: (account: object) => void;
    loadJWT: () => void;
}

type IReduxState = {
    jwt: string | null;
}


type IProps = RouteComponentProps<{}> & IReduxDispatch & IReduxState;

const Header: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [loginVisible, setLoginVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.jwt === null) {
            props.loadJWT();
        }
    });


    const renderTopRightWidget = () => {
        if (props.jwt) {
            return (<Link to="profile">
                <span className="title clr-white fw-600 font-lg">
                    Profile
                </span>
            </Link>)
        }

        return (<button onClick={() => setLoginVisible(true)} className="body rounded clr-accent bkg-white fw-600 font-lg">
            Login
        </button>
        );
    }

    return <header className="header clr-accent flexbox flex-center pd-sm">
        <Link to="/">
            <div className="title clr-white fw-600 font-xlg">
                Zeus
            </div>
        </Link>
        <div className="flex-grow" />
        {renderTopRightWidget()}

        <Login
            visible={loginVisible}
            onLogin={(acc: object) => {
                console.log('fetch and set', acc)
                props.fetchSetJWT(acc);
                setLoginVisible(false);
                props.history.push('/profile')
            }} onCancel={() => setLoginVisible(false)} />

    </header>
};

const mapDispatchToProps = (dispatch: any): IReduxDispatch => {
    return {
        fetchSetJWT: dispatch(fetchSetJWT),
        loadJWT: dispatch(checkLSForJWT)
    }
}

const mapStateToProps = (state: GlobalState): IReduxState => {
    return {
        jwt: state[MainReducerName].jwt
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));