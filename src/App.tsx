/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import './scss/app.scss';

const App: React.FC = () => (
    <div className="wrapper">
        <Header />
        <Content />
    </div>
);

export default App;
