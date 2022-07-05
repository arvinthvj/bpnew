import React from 'react'
import { routes } from '../../../utility/constants/constants';

const cancelProfileModal = props => {
    return (
        <div className="modal fade" id="cancel_profile_form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <a href="javascript:void();" type="button" className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a>
                        {/* <h5 className="modal-title mt-4 mb-2" id="exampleModalLongTitle" style={{ textTransform: 'capitalize', fontWeight: '600' }}>{}</h5> */}
                        <p className="mb-3">If you abort your Profile now you will be logged out and when you log in next time the Profile process will continue at this same place.</p>
                        <div className="d-flex justify-content-center">
                            <a onClick={() => { props.logout(); }} data-dismiss="modal" href="javascript:void(0)" className="form_link ft_Weight_500 ph_underline">[Abort Now]</a>
                            <a data-dismiss="modal" href="javascript:void(0)" className="form_link ft_Weight_500 ph_underline ml-2">[Continue Profile]</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cancelProfileModal