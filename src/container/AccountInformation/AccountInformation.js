import React, { Component } from 'react'
import AccountInformationPage from '../../components/AccountInformationPage/AccountInformationPage'
import { routes } from '../../utility/constants/constants'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'

class AccountInformation extends Component {

    componentDidMount = () => {
        let currentPath = this.props.history.location.pathname
        if (currentPath === routes.ACCOUNT_INFORMATION) {
            this.props.history.push(routes.EDIT_ACCOUNT_INFO)
        }
        this.props.fetchCurrentUser()
    }

    render() {
        return (
            <AccountInformationPage
                user={this.props.user}
                updateAccountInfo={this.props.updateAccountInfo}
                changePassword={this.props.changePassword}
                isLoading={this.props.isLoading}
                history={this.props.history}
                isUserSettingsLoading={this.props.isUserSettingsLoading}
                updateUserSettings={this.props.updateUserSettings}
                sendVerifyEduEmail={this.props.sendVerifyEduEmail}
                history={this.props.history} />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isLoading: state.authReducer.isloading,
    isUserSettingsLoading: state.userReducer.isUserSettingsLoading
});

const mapStateToDispatch = (dispatch) => ({
    updateAccountInfo: (user) => dispatch(actions.updateAccountInfo(user)),
    changePassword: (password) => dispatch(actions.changePassword(password)),
    updateUserSettings: (setting) => dispatch(actions.updateUserSettings(setting)),
    fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    sendVerifyEduEmail: () => dispatch(actions.sendVerifyEduEmail())
});

export default connect(mapStateToProps, mapStateToDispatch)(AccountInformation)