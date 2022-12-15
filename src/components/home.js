import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import PageTitle from './PageTitle';
import styles from '../styles/modules/app.module.scss';

const Home = () => {
    return (
        <div>
            <div  className="container">
                <PageTitle style={{fontSize:40  }}>TODO List</PageTitle>
                <div className={styles.app__wrapper}>
                    <AppHeader />
                    <AppContent />
                </div>
            </div>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        fontSize: '1.4rem',
                    },
                }}
            />
        </div>
    );
};

export default Home;
