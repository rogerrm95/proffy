import React from 'react'

// Componentes //
import TopBarHeader from '../TopBarHeader';

// CSS //
import './style.css'

interface PageHeaderProps {
    headerTitle: string
    title: string;
    description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className='page-header'>

            <TopBarHeader title={props.headerTitle}/>

            <div className='header-content'>
                <strong>{props.title}</strong>

                {props.description ? <p>{props.description}</p> : null}

                {props.children}
            </div>

        </header>
    );
}

export default PageHeader;