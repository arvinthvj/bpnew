import React from 'react';
import ContentLoader from 'react-content-loader'

const ClassifiedSkeleton = () => {

    return (
        <ContentLoader
            speed={2}
            width={1200}
            height={1200}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="20" width="200" height="30" />
            <rect x="1000" y="20" width="50" height="30" />
            {/* <rect x="200" y="20" width="50" height="30" />
            <rect x="300" y="20" width="50" height="30" />
            <rect x="400" y="20" width="50" height="30" />
            <rect x="500" y="20" width="50" height="30" />
            <rect x="600" y="20" width="50" height="30" /> */}

            <rect x="10" y="100" rx="5" ry="5" width="200" height="200" />
            <rect x="220" y="100" rx="5" ry="5" width="200" height="200" />
            <rect x="430" y="100" rx="5" ry="5" width="200" height="200" />
            <rect x="640" y="100" rx="5" ry="5" width="200" height="200" />
            <rect x="850" y="100" rx="5" ry="5" width="200" height="200" />

            <rect x="10" y="350" width="200" height="200" />
            <rect x="220" y="350" width="200" height="200" />
            <rect x="430" y="350" width="200" height="200" />
            <rect x="640" y="350" width="200" height="200" />
            <rect x="850" y="350" width="200" height="200" />
            {/* <rect x="50" y="0" rx="3" ry="3" width="30" height="26" /> */}
            {/* <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> */}
            {/* <circle cx="20" cy="20" r="20" /> */}
        </ContentLoader>

    )
}

export default ClassifiedSkeleton;