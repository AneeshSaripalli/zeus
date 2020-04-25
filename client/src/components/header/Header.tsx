import React from 'react';
import './Header.css';

type IProps = {

}

const Header: React.FC<IProps> = (props: IProps): JSX.Element => {
    return <header className="header clr-accent flexbox flex-center pd-sm">
        <div className="title clr-white fw-600 font-xlg">
            Zeus
        </div>
        {/* <div className="body clr-white fw-600 font-lg">
            Home
        </div> */}
        <div className="flex-grow">

        </div>
        <button onClick={() => console.log('login attempt')} className="body rounded clr-accent bkg-white fw-600 font-lg">
            Login
        </button>


    </header>
};

export default Header;