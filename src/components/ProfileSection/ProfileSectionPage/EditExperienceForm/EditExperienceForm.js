import React, { useState, useEffect } from 'react'
import ExperienceForm from '../../ExperienceForm/ExperienceForm'
import Moment from 'react-moment'
import { showConfirmAlert } from '../../../../utility/successAlert/confirmAlert'

const EditExperienceForm = props => {

    const [showAddExperienceForm, setShowAddExperienceForm] = useState(false)
    const [showEditExperienceForm, setShowEditExperienceForm] = useState(false)
    const [experienceDetails, setExperienceDetails] = useState(null)

    useEffect(() => {
        if (showAddExperienceForm) {
            setShowAddExperienceForm(false)
        }
        if (showEditExperienceForm) {
            setShowEditExperienceForm(false)
        }
    }, [props.profileDetails])

    const toggleExperienceForm = (event, selectedExperience, closeBothForms) => {
        if (selectedExperience) {
            setExperienceDetails(selectedExperience)
            setShowEditExperienceForm(!showEditExperienceForm)
            setShowAddExperienceForm(false)
        } else if (closeBothForms) {
            setExperienceDetails(null)
            setShowEditExperienceForm(false)
            setShowAddExperienceForm(false)
        } else {
            setExperienceDetails(null)
            setShowEditExperienceForm(false)
            setShowAddExperienceForm(!showAddExperienceForm)
        }
    }

    if (props.profileDetails && props.profileDetails.experiences && props.profileDetails.experiences.length === 0) {
        //  
        if (!showAddExperienceForm) {
            setShowAddExperienceForm(true)
        }
    }

    return (
        <div className="tab-pane fade show active" style={{ display: 'block' }} id="experience-portfolio" role="tabpanel" aria-labelledby="experience-portfolio-tab">
            <form>
                {/* <div className="ph_btn_wrp_add text-right">
                    <a href="javascript:void(0)" id="add_experience" className="theme_btn theme_primary text-uppercase add_experience"><i className="fa fa-plus"></i> Add Experience</a>
                </div> */}
                <div className="ph_title_btn ph_flex_wrp_spw">
                    <h4 className="theme_sm_title">Experience</h4>
                    <a href="javascript:void(0)" onClick={toggleExperienceForm} className="theme_btn theme_primary text-uppercase add_experience">Add Experience</a>
                </div>
                {
                    props.profileDetails && props.profileDetails.experiences && props.profileDetails.experiences.length > 0 && (!showAddExperienceForm && !showEditExperienceForm)
                        ? props.profileDetails.experiences.map((experience, index) => {
                            return (
                                <div className="card switch_card_list card_bg_300">
                                    <div className="card-body">
                                        <div className="ph_flex_wrp_spw ph_switch_wrp align-items-start">
                                            <div className="ph_switch_text">
                                                <h4 className="ph_border_bottom mb-2">
                                                    <a href="javascript:void(0)" id="edit_experience" className="edit_experience text_secondary">{experience.position}</a>
                                                </h4>
                                                {/* <p className="text-black-50 mb-2">There are many variations of passages of Lorem Ipsum available, but the
                                    majority have suffered alteration in some form</p> */}
                                                <p className="text-black-50 mb-2">Company name - <span className="text-black">{experience.company}</span></p>
                                                {/* <p className="text-black-50 mb-2">Position - <span className="text-black">Marketing Manager</span></p> */}
                                                {experience.city ? <p className="text-black-50 mb-2">City - <span className="text-black">{experience.city}</span></p> : null}
                                                <p className="text-black-50 mb-2">From date - <span className="text-black"><Moment format="MMM DD, YYYY">{experience.from_date}</Moment></span></p>
                                                <p className="text-black-50 mb-2">To date - <span className="text-black"><Moment format="MMM DD, YYYY">{experience.current ? new Date() : experience.to_date}</Moment></span></p>
                                            </div>
                                            <div className="ph_switch_con ph_crud_wrp experience_actions">
                                                <a href="javascript:void(0)" onClick={(event) => toggleExperienceForm(event, experience)} id="edit_experience" className="edit_experience">
                                                    <img src="/images/icons/icn_pencil.svg" alt="Edit Icon" />
                                                </a>
                                                <a onClick={() => showConfirmAlert("Please Confirm", 'Are you sure that you would like to delete?', () => {
                                                    props.deleteExperience(props.profileDetails.id, experience.id)
                                                })} href="javascript:void(0)"><img src="/images/icons/icn_trash_orange.svg" alt="Delete Icon" /> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                }
                {
                    showAddExperienceForm || showEditExperienceForm
                        ? <div className="card switch_card_list card_bg_300 add_experience_cont">
                            <div className="card-body">
                                <ExperienceForm
                                    createExperience={props.createExperience}
                                    updateExperience={props.updateExperience}
                                    toggleExperienceForm={toggleExperienceForm}
                                    isLoading={props.isLoading}
                                    profileId={props.profileDetails.id}
                                    showAddExperienceForm={showAddExperienceForm}
                                    showEditExperienceForm={showEditExperienceForm}
                                    experienceDetails={experienceDetails}
                                    history={props.history}
                                    user={props.user} />
                            </div>
                        </div>
                        : null
                }
            </form>
        </div>
    )
}

export default EditExperienceForm