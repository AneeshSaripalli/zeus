import React from 'react';
import './Header.css'

type IProps = {

}

const Header: React.FC<IProps> = (props: IProps): JSX.Element => {
    return <header className="header clr-accent flexbox flex-center pd-sm">
        <div style={{ color: 'white', }} className="title fw-600 fw-xlg">
            Zeus
        </div>

    </header>
};

export default Header;