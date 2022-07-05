import React, { Suspense } from 'react';
import Layout from '../hoc/Layout/Layout';
import SpinnerLoader from '../components/UI/SpinnerLoader/SpinnerLoader';
import NonLoggedInRoutes from './NonLoggedInRoutes';
import Helmet from 'react-helmet'
import Oux from '../hoc/Oux/Oux';
const LoggedInRoutes = React.lazy(() => import('./LoggedInRoutes'));
// const NonLoggedInRoutes = React.lazy(() => import('./NonLoggedInRoutes'));

const Router = (props) => {
    let routeList = null;
    let user = props.user;
    if (user && props.token) {
        //when user is logged in
        routeList = <LoggedInRoutes user={props.user} token={props.token} />
    } else {
        //when user is not logged in
        routeList = <NonLoggedInRoutes isRefreshTokenLoading={props.isRefreshTokenLoading} user={props.user} token={props.token} />
    }

    let gtmTagScript = (
        <script>
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-BD1195DW9T');`}
        </script>
    )

    return (
        <Oux>
            <Helmet>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-BD1195DW9T"></script>
                {gtmTagScript}
            </Helmet>
            <Layout>
                <Suspense fallback={<div className="ph_empty_message"><SpinnerLoader /></div>}>
                    {routeList}
                </Suspense>
            </Layout>
        </Oux>
    )
};

export default Router;

export const NotFound = () => {
    return (
        <h1 className="text-center" style={{ margin: '100px' }}>404. Page not found.</h1>
    );
};

