import ArrowDown from '@ant-design/icons/ArrowDownOutlined';
import React from 'react';
import './Landing.css';
import Divider from 'antd/es/divider'

type IProps = {

}

const Landing: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <div className="page">
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

                <p className="fw-600  rounded clr-accent body pd-sm font-lg">
                    The issue with energy reduction is an incentives problem.
                    </p>

                <img src="/current.jpg" width="800px" className="bkg-white rounded" style={{ padding: 20, marginBottom: '50px' }} />

                <p className="fw-600  rounded clr-accent body pd-sm font-lg">
                    Limiting energy consumption goes directly against utilities providers' best interests.<br />
                    After all, they make their money by selling utilities.
                  </p>

                <img src="/zeuselectric.jpg" width="1000px" className="bkg-white rounded" style={{ padding: 20, marginBottom: '50px' }} />
                <p className="rounded clr-accent body pd-sm font-lg">
                    <span className="fw-600 text"><u>Zeus works by</u></span>
                    <ul className="fw-400 text" style={{ listStyle: 'none' }}>
                        <li>Flipping the utility providers' incentives</li>
                        <li>Gamifying the resource conservation process.</li>
                    </ul>
                </p>
                <Divider style={{ backgroundColor: 'rgba(0,0,0,.1)' }} />

                <div className="title fw-600 font-xlg pd-sm clr-accent rounded" style={{ margin: 20 }}>
                    Learn more about Zeus by logging in!
                </div>
            </div>
        </div >
    )
};

export default Landing;