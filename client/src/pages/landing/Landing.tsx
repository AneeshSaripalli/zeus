import React from 'react';
import './Landing.css'
import ArrowDown from '@ant-design/icons/ArrowDownOutlined'
import Icon from '@ant-design/icons/lib/components/Icon';

type IProps = {

}

const Landing: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (<div>
        <div className="title bkg-accent flexbox flex-column flex-center fadein" id="landing" style={{ height: 'calc(100vh - var(--header-px))', textAlign: 'center', paddingBottom: 30 }}>
            <div className="flex-grow" />
            <div className="clr-white title" style={{ fontSize: '60px' }}>
                <span className="hover-grow">
                    Zeus
                    </span>
            </div>
            <div className="bkg-white rounded clr-accent pd-sm subtitle fadein font-lg" id="subtitle">
                Making resource conservation fun..
                </div>
            <div className="flex-grow" />
            <ArrowDown color="#000000" className="bkg-white clr-accent clickable" id="click-arrow" />
        </div>


        <div className="flexbox flex-column flex-center" style={{ backgroundColor: 'rgba(240,240,240)', height: '50%', textAlign: 'center', paddingTop: '10px' }}>
            <div className="clr-accent title anim-delay-1s" id="whatwedo" style={{ fontSize: '40px' }}>
                <span className="hover-grow bkg-accent clr-white rounded pd-sm">
                    What We Do
                     </span>
            </div>
        </div>

    </div>
    )
};

export default Landing;