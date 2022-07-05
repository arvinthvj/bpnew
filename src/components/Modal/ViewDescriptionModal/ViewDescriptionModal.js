import React from 'react'

const viewDescriptionModal = props => {
    return (
        <div className="modal fade" id="description_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <a href="javascript:void();" type="button" className="close p-0 m-0 ml-auto d-block" data-dismiss="modal" aria-label="Close">
                            <img src="/images/icons/icn_close_gray.svg" alt="Icon Close" />
                        </a>
                        <h5 className="modal-title mt-4 mb-2" id="exampleModalLongTitle" style={{ textTransform: 'capitalize', fontWeight: '600' }}>{props.descriptionTitle}</h5>
                        <p className="mb-3">{props.fullDescription}</p>
                        <a onClick={() => { window.$('#description_modal').modal() }} data-dismiss="modal" style={{ color: '#fff' }} className="theme_btn theme_primary min_w110">Close</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default viewDescriptionModal