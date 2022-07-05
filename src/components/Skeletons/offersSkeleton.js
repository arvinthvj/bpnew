import React from 'react';
import ContentLoader from 'react-content-loader'

export const OffersTabsSkeleton = () => {

    return (
        <ContentLoader
            speed={2}
            width={1200}
            height={1200}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="130" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="250" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="370" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="500" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="630" y="20" rx="3" ry="3" width="100" height="40" />
            <rect x="750" y="20" rx="3" ry="3" width="100" height="40" />
        </ContentLoader>
    )
}

export const OffersListSkeleton = () => {
 
    return (
        <ContentLoader
            speed={2}
            width={1000}
            height={1000}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="20" width="200" height="30" />
            <rect x="750" y="20" width="200" height="30" />

            <rect x="0" y="100" rx="5" ry="5" width="950" height="200" />
            <rect x="0" y="320" rx="5" ry="5" width="950" height="200" />
            <rect x="0" y="550" rx="5" ry="5" width="950" height="200" />
            <rect x="0" y="760" rx="5" ry="5" width="950" height="200" />
            <rect x="0" y="970" rx="5" ry="5" width="950" height="200" />

            {/* <rect x="50" y="0" rx="3" ry="3" width="30" height="26" /> */}
            {/* <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> */}
            {/* <circle cx="20" cy="20" r="20" /> */}
        </ContentLoader>

    )
}
