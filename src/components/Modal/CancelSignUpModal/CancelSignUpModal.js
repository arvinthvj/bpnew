import React from 'react'
import { routes } from '../../../utility/constants/constants';

const cancelSignUpModal = props => {
    return (
        <div className="modal fade" id="cancel_signup_form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <a href="javascript:void();" type="button" className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a>
                        {/* <h5 className="modal-title mt-4 mb-2" id="exampleModalLongTitle" style={{ textTransform: 'capitalize', fontWeight: '600' }}>{}</h5> */}
                        <p className="mb-3">If you abort the sign up process now <bold>you will be logged out and when you log in next time</bold> the sign up process will continue at this same place.</p>
                        <div className="d-flex justify-content-center">
                            <a onClick={() => { props.logout() }} href="javascript:void(0)" data-dismiss="modal" className="form_link ft_Weight_500 ph_underline">[Abort Now]</a>
                            <a data-dismiss="modal" href="javascript:void(0)" className="form_link ft_Weight_500 ph_underline ml-2">[Continue Sign Up]</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cancelSignUpModal