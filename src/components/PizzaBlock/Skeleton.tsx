import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={286}
        height={455}
        viewBox="0 0 286 455"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="135" cy="128" r="120" />
        <rect x="0" y="269" rx="15" ry="15" width="286" height="25" />
        <rect x="0" y="311" rx="15" ry="15" width="286" height="72" />
        <rect x="0" y="400" rx="15" ry="15" width="100" height="40" />
        <rect x="126" y="399" rx="30" ry="30" width="160" height="46" />
    </ContentLoader>
);

export default Skeleton;
