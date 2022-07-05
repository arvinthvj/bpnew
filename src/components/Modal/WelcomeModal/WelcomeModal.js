import React from 'react'
import { routes } from '../../../utility/constants/constants';
import { withRouter } from 'react-router-dom';
import $ from 'jquery'
const welcomeModal = props => {
    return (
        <div className="modal fade" id="welcome_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <a href="javascript:void();" type="button" onClick={() => {
                            $('#click').click()
                        }} className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a>
                        <h5 className="modal-title mt-4 mb-2" id="exampleModalLongTitle"><b>Important!</b></h5>
                        <p className="mb-3">Welcome to PartnerHere! We have created your <b>default 'Offer' card which is active and visible</b> on this site <b>under 'People'</b>.You may edit or disable it at any time <b>via Offers {`>`} People</b>.</p>
                        <a onClick={() => { props.history.push(routes.OFFERS); $('#click').click() }} data-dismiss="modal" style={{ color: '#fff', cursor: 'pointer' }} className="theme_btn theme_primary min_w110">Click Here to see it now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(welcomeModal)