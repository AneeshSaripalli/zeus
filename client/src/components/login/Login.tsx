import React from 'react';

import { firebaseModule } from '../../firebase/module';
import firebase from 'firebase';

import Modal from 'antd/es/modal';
import Button from 'antd/es/button';

type IProps = {
    onCancel: () => void;
    visible: boolean;
    onFailure?: () => void;
    onLogin: (profile: object) => void;
}

const Login: React.FC<IProps> = (props: IProps): JSX.Element => {

    const handleLogin = (provider: firebase.auth.AuthProvider) => {
        firebaseModule.auth().signInWithPopup(provider).then(
            result => {
                const user = result.user;

                if (user === null) {
                    if (props.onFailure)
                        return props.onFailure();
                    else {
                        return;
                    }
                }

                props.onLogin(user);
            }
        )
    }

    return (<Modal
        title="Zeus Login"
        className="text-center"
        onCancel={props.onCancel}
        visible={props.visible}
        footer={[
            <p className="text-center">
                Login to track your account.
            </p>
        ]}
    >
        <Button className="clr-white" style={{ background: 'rgb(58,91,160)', width: '45%' }}
            onClick={() => {
                const provider = new firebaseModule.auth.FacebookAuthProvider();
                provider.addScope('email')
                handleLogin(provider)
            }}>
            <div className="flexbox flex-row">
                <img width='20' height='20' style={{ alignItems: 'left', }} src={'https://cdn0.iconfinder.com/data/icons/social-network-7/50/3-256.png'} />
                <div className="flex-grow" />
                <span style={{ color: 'white' }}>
                    Continue with Facebook
                </span>
            </div>
        </Button>
        <br />
        <Button className="bkg-white clr-white" style={{ width: '45%' }}
            onClick={() => {
                const provider = new firebaseModule.auth.GoogleAuthProvider();
                provider.addScope('email')
                handleLogin(provider)
            }}>
            <div className="flexbox flex-row">
                <img width='20' height='20' style={{ alignItems: 'left' }} src={'https://cdn0.iconfinder.com/data/icons/social-network-7/50/2-256.png'} />
                <div className="flex-grow" />
                <span style={{ color: 'gray' }}>
                    Continue with Google
                </span>
            </div>
        </Button>
    </Modal>);
};

export default Login;