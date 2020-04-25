import React from 'react';
import './Landing.css'
import ArrowDown from '@ant-design/icons/ArrowDownOutlined'
import Icon from '@ant-design/icons/lib/components/Icon';

type IProps = {

}

const Landing: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (<div>
        <div className="title bkg-accent flexbox flex-column flex-center fadein" id="landing">
            <div className="flex-grow" />
            <div className="clr-white title" style={{ fontSize: '60px', marginBottom: '10px' }}>
                <span className="hover-grow">
                    Zeus
                    </span>
            </div>
            <div className="clr-white rounded pd-sm subtitle fadein font-lg" id="subtitle">
                Making resource conservation fun
                </div>
            <div className="flex-grow" />
            <a href='#info'>
                <ArrowDown color="#000000" className="bkg-white clr-accent clickable" id="click-arrow" />
            </a>
        </div>


        <div className="flexbox flex-column flex-center" id="info" style={{ height: '100vh', backgroundColor: 'rgba(240,240,240)', textAlign: 'center', paddingTop: '50px' }}>
            <a href='info' />
            <div className="clr-accent title anim-delay-1s" id="whatwedo" style={{ fontSize: '40px' }}>
                <span className="hover-grow clr-accent rounded pd-sm fw-600">
                    What We Do
                </span>
            </div>
            <div className="clr-black body fw-600 font-xlg" style={{ marginTop: '60px', marginLeft: "10%", marginRight: '10%' }}>
                <div>We've solved the incentives problem for reducing power consumption.</div>

            </div>

        </div>

    </div >
    )
};

export default Landing;