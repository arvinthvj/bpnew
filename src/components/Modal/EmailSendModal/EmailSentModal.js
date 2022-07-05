import React from 'react'
import { routes } from '../../../utility/constants/constants'

const emailSentModal = props => {
    return (
        <div className="modal fade" data-backdrop="static" id="email_sent_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        {/* <a href="javascript:void();" type="button" className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a> */}
                        <h5 className="modal-title mt-4 mb-2" id="exampleModalLongTitle">Verification Mail Sent</h5>
                        <p className="mb-3" style={{ fontWeight: '600' }}>Please check your .edu inbox and click on the link to verify your email address.</p>
                        {
                            routes.EDIT_ACCOUNT_INFO.includes(props.history.location.pathname)
                                ? <a data-dismiss="modal" href="javascript:void(0)" className="theme_btn theme_primary min_w110">Ok, Got It</a>
                                : <a onClick={() => { props.history.push(routes.HOME) }} data-dismiss="modal" href="javascript:void(0)" className="theme_btn theme_primary min_w110">Ok, Got It</a>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default emailSentModal