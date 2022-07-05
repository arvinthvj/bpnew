import React, { useEffect } from 'react'
import SkillsForm from '../../SkillsForm/SkillsForm'

const EditSkillsForm = props => {

    useEffect(() => {
        if ((props.skills && props.skills.length > 0) && props.profileDetails && props.profileDetails.skills && props.profileDetails.skills.length > 0 && !props.isSelectedSkillsUpdated) {
            props.selectedSkillHandler(props.profileDetails.skills)
        }
    }, [props.profileDetails, (!props.isSelectedSkillsUpdated && props.skills)])

    console.log(props.selectedSkills, "selectedSkillsEdit")

    return (
        <div className="tab-pane fade show active" style={{ display: 'block' }} id="experience-portfolio" role="tabpanel" aria-labelledby="experience-portfolio-tab">
            <div className="card switch_card_list card_bg_300 add_experience_cont">
                <div className="card-body">
                    <SkillsForm
                        searchText={props.searchText}
                        searchInputFocus={props.searchInputFocus}
                        onSkillsFocusHandler={props.onSkillsFocusHandler}
                        onSkillSearchTextChangeHandler={props.onSkillSearchTextChangeHandler}
                        setWrapperRef={props.setWrapperRef}
                        createSkills={props.createSkills}
                        selectedSkillHandler={props.selectedSkillHandler}
                        onRemoveSelectedSkills={props.onRemoveSelectedSkills}
                        selectedSkills={props.selectedSkills}
                        updateProfile={props.updateProfile}
                        skills={props.skills}
                        isLoading={props.isLoading}
                        profileDetails={props.profileDetails}
                        history={props.history}
                        user={props.user} />
                </div>
            </div>
        </div>
    )
}

export default EditSkillsForm