import React from 'react';
import { trimString, fetchCompensations } from '../../utility/utility';
import { showConfirmAlert } from '../../utility/successAlert/confirmAlert';
import { CategoriesList, STATUS, SubscriptionStatus } from '../../utility/constants/constants';
import CustomToolTip from '../UI/CustomToolTip/CustomToolTip';
import cloneDeep from 'clone-deep';

const ClassifiedList = (props) => {

    const renderServicesList = () => {

        const fetchSkills = (skills) => {
            let skillList = '';
            skills.forEach((skill, i) => {
                if ((skills.length - 1) === i) {
                    skillList = skillList.concat(skill.name);
                } else {
                    skillList = skillList.concat(skill.name + ' | ')
                }
            })
            return skillList;
        }

        const toggleActiveOrInactive = (e, id) => {
            const index = props.classifiedList.findIndex(s => s.id === id);
            const service = cloneDeep(props.classifiedList[index]);
            if ((props.user.subscription_status === SubscriptionStatus.ACTIVE) || (service.is_profile)) {
                props.toggleActiveOrInactive(e.target.checked, id);
            }
        }

        if (props.classifiedList && props.classifiedList.length > 0) {
            return props.classifiedList.map(service => {

                return (
                    <div className="ph_title_btn ph_xs_offer_reverse">
                        <div className="ph_flex_wrp_spw ph_switch_wrp align-items-start">
                            <div className="ph_switch_text">
                                <h4 className="ph_border_bottom mb-2">
                                    {service.title}
                                    {/* <a href="#" className="text-primary fontS14 ft_Weight_600"><em>Primary profile</em></a> */}
                                </h4>
                                <p className="text-black-50 mb-2">{trimString(service.description, 100)}</p>
                                <p className="text-black-50 mb-2">Compensation -<span className="text-black">{fetchCompensations(service.compensations)}</span>

                                </p>
                                <p className="mb-2">{fetchSkills(service.skills)}</p>
                                {/* <p className="mb-2">March 2019 - Feb 2020</p> */}
                                <h5 className="text_secondary_o54 mb-2">{service.address.zip}</h5>
                            </div>
                            <div className="ph_switch_con ph_crud_wrp">
                                <label className="ph_switch">
                                    <input type="checkbox" onChange={(e) => toggleActiveOrInactive(e, service.id)} checked={service.active_status === STATUS.ACTIVE ? true : false} />
                                    <CustomToolTip placement="top" text="Show In Searches">
                                        <span className="ph_slider round"></span>
                                    </CustomToolTip>
                                </label>
                                <a href="javascript:void(0)" id="edit_service_target" onClick={() => props.editClassified(service)}>
                                    <CustomToolTip placement="top" text="Edit This Want Ad">
                                        <img src="/images/icons/icn_pencil.svg" alt="Edit Icon" />
                                    </CustomToolTip>
                                </a>
                                {service.is_profile ? null :
                                    <a href="javascript:void(0)"
                                        onClick={() => showConfirmAlert("Please Confirm", 'Are you sure that you would like to delete?', () => {
                                            props.deleteClassified(service.id);
                                        })}><CustomToolTip placement="top" text="Delete This Want Ad">
                                            <img src="/images/icons/icn_trash_orange.svg" alt="Delete Icon" />
                                        </CustomToolTip> </a>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <section className="ph_main_sec pt_83 my_offers_ser_sec">
            <div className="container-fluid theme_px_60">
                <div className="ph_hz_tabs_wrp">
                    <div className="tab-pane fade show active" id="pills-my-services" role="tabpanel" aria-labelledby="pills-my-services-tab">
                        <div class="tab-content" id="pills-tabContent">
                            <div className="card switch_card_list card_bg_300">
                                <div className="card-body">
                                    <div className="ph_title_btn ph_flex_wrp_spw ph_xs_offer_reverse">
                                        <h4 className="theme_sm_title">My Want Ads: What I Need But Can't Find</h4>
                                        <a href="javascript:void(0)" id="create_new_offer" 
                                        // id = "create_new_offer_walk" 
                                        className="theme_btn theme_primary text-uppercase" onClick={() => { props.createClassifiedClicked(); props.createClassifiedAdd(true); }}>Create new Want AD</a>
                                    </div>
                                    {renderServicesList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClassifiedList;