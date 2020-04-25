import ArrowDown from '@ant-design/icons/ArrowDownOutlined';
import React from 'react';
import './Landing.css';

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


        <div className="flexbox flex-column flex-center" id="info" >
            <div className="clr-accent title anim-delay-1s" id="whatwedo" style={{ fontSize: '40px' }}>
                <span className="hover-grow clr-accent rounded pd-sm fw-600">
                    What We Do
                </span>
            </div>
            <div className="clr-black body fw-400 font-xlg h-center" id="product-desc" >
                <p>
                    By gamifying and incentivizing environmental friendliness, <br />
                    we've solved the incentives problem for reducing resource consumption.<br />
                </p>
            </div>

            <div className="flex-grow" />
            <div>
                Diagram here
            </div>

            <div className="flex-grow" />
            <div className="title fw-600 font-xlg pd-sm clr-accent rounded">
                Learn more about Zeus by logging in!
            </div>
        </div>

    </div >
    )
};

export default Landing;