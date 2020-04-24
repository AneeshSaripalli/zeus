import React from 'react';
import './Landing.css'

type IProps = {

}

const Landing: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <div className="title bkg-accent flexbox flex-column flex-center fadein" id="landing" style={{ height: 'calc(50vh)', textAlign: 'center' }}>
            <div className="flex-grow" />
            <div className="clr-white title" style={{ fontSize: '60px' }}>
                <span className="hover-grow">
                    Zeus
                </span>
            </div>
            <div className="clr-white subtitle font-lg">
                Making resource conservation fun.
            </div>
            <div className="flex-grow" />
        </div>)
};

export default Landing;