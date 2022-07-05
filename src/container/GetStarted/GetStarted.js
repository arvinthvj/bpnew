import React, { Component } from 'react'
import GetStartedPage from '../../components/GetStartedPage/GetStartedPage'
import { scrollToDivUsingClassName } from '../../utility/utility'
import { routes } from '../../utility/constants/constants'
import { connect } from 'react-redux'

class GetStarted extends Component {

    componentDidMount = () => {
        if (this.props.history.location.state && this.props.history.location.state.elementClassName) {
            scrollToDivUsingClassName(this.props.history.location.state.elementClassName)
            this.props.history.push(routes.GET_STARTED)
        }
    }

    render() {
        return (
            <GetStartedPage
                history={this.props.history}
                get_started={this.props.get_started} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        get_started: state.configReducer.get_started
    }
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)