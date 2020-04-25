import React from 'react';
import './Header.css';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import Login from '../login/Login';

type IProps = RouteComponentProps<{}>;

const Header: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [loginVisible, setLoginVisible] = React.useState<boolean>(false);

    return <header className="header clr-accent flexbox flex-center pd-sm">
        <Link to="/">
            <div className="title clr-white fw-600 font-xlg">
                Zeus
            </div>
        </Link>
        <div className="flex-grow">
        </div>
        <button onClick={() => setLoginVisible(true)} className="body rounded clr-accent bkg-white fw-600 font-lg">
            Login
        </button>

        <Login visible={loginVisible} onLogin={() => {
            console.log('login')
            props.history.push('/profile')
        }} onCancel={() => setLoginVisible(false)} />

    </header>
};

export default withRouter(Header);