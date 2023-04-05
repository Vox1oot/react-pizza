import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Cart';

const Content = () => (
    <div className="content">
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    </div>
);

export default Content;
