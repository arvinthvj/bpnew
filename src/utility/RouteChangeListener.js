

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'


const Component = ({ history }) => {
    useEffect(() => history.listen(() => {
        // do something on route change
        // for my example, close a drawer
        let location = history.location;
        window.scroll(0, 0);
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
    }), [])

    return null;
    //...
}

export default withRouter(Component)