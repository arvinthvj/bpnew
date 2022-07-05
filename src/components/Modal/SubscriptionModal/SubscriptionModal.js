import React from 'react'
import MembershipLevel from '../../AccountInformationPage/MembershipLevel'

const subscriptionModal = props => {
    return (
        <div class="modal fade" id="subscription_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <a href="javascript:void();" type="button" class="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a>

                        <div class="modal_card_wrp">
                            <MembershipLevel
                                user={props.user}
                                history={props.history}
                                isLoading={props.isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default subscriptionModal