import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../../../utility/constants/constants';
import CreateProfileForm from '../CreateProfileForm/CreateProfileForm';
import AllProfiles from './AllProfiles/AllProfiles';
import EditExperienceForm from './EditExperienceForm/EditExperienceForm';
import EditPortfolioForm from './EditPortfolioForm/EditPortfolioForm';
import EditSkillsForm from './EditSkillsForm/EditSkillsForm';
import PeopleDetails from '../../OfferDetailsPage/PeopleDetails/PeopleDetails';
import ProjectPlannerForm from '../ProjectPlannerForm/ProjectPlannerForm';

const profileSectionPage = (props) => {
   return (
      <Switch>
         <Route exact path={routes.EDIT_PROFILE}>
            <CreateProfileForm
               updateProfile={props.updateProfile}
               profilePhotoUpload={props.profilePhotoUpload}
               createProfile={props.createProfile}
               handleAddressSelect={props.handleAddressSelect}
               onImageUpload={props.onImageUpload}
               profilePhotoPath={props.profilePhotoPath}
               file={props.file}
               isProfileImageUploading={props.isProfileImageUploading}
               profileImage={props.image}
               address={props.address}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
               setBusinessProfile={props.setBusinessProfile}
               businessProfile={props.businessProfile}
            />
         </Route>
         <Route exact path={routes.EDIT_SKILLS}>
            <EditSkillsForm
               searchText={props.searchText}
               searchInputFocus={props.searchInputFocus}
               onSkillsFocusHandler={props.onSkillsFocusHandler}
               onSkillSearchTextChangeHandler={
                  props.onSkillSearchTextChangeHandler
               }
               setWrapperRef={props.setWrapperRef}
               createSkills={props.createSkills}
               selectedSkillHandler={props.selectedSkillHandler}
               onRemoveSelectedSkills={props.onRemoveSelectedSkills}
               selectedSkills={props.selectedSkills}
               skills={props.skills}
               updateProfile={props.updateProfile}
               isLoading={props.isLoading}
               isConfigLoading={props.isConfigLoading}
               isSelectedSkillsUpdated={props.isSelectedSkillsUpdated}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.EDIT_EXPERIENCE}>
            <EditExperienceForm
               updateExperience={props.updateExperience}
               createExperience={props.createExperience}
               deleteExperience={props.deleteExperience}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.EDIT_PORTFOLIO}>
            <EditPortfolioForm
               getPortfolioPresignedUrls={props.getPortfolioPresignedUrls}
               deletePortfolio={props.deletePortfolio}
               addPortfolioImages={props.addPortfolioImages}
               updateBase64={props.updateBase64}
               fieldChange={props.fieldChange}
               updatePortfolio={props.updatePortfolio}
               updateImageState={props.updateImageState}
               idsToDelete={props.idsToDelete}
               removeBase64Image={props.removeBase64Image}
               imageUrl={props.imageUrl}
               imageName={props.imageName}
               invalidPortfolioUrl={props.invalidPortfolioUrl}
               invalidVideoUrl={props.invalidVideoUrl}
               video_url={props.video_url}
               base64={props.base64}
               link_url={props.link_url}
               AllFileTypes={props.AllFileTypes}
               fileType={props.fileType}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.MANAGE_ALL_PROFILE}>
            <AllProfiles
               toggleManageEditForm={props.toggleManageEditForm}
               toggleManageAddForm={props.toggleManageAddForm}
               profiles={props.profiles}
               isLoading={props.isLoading}
               deleteProfile={props.deleteProfile}
               toggleProfile={props.toggleProfile}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.MANAGE_PROFILE_EDIT}>
            <CreateProfileForm
               updateProfile={props.updateProfile}
               profilePhotoUpload={props.profilePhotoUpload}
               createProfile={props.createProfile}
               handleAddressSelect={props.handleAddressSelect}
               onImageUpload={props.onImageUpload}
               isProfileImageUploading={props.isProfileImageUploading}
               profilePhotoPath={props.profilePhotoPath}
               file={props.file}
               profileImage={props.image}
               address={props.address}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
               setBusinessProfile={props.setBusinessProfile}
               businessProfile={props.businessProfile}
            />
         </Route>
         <Route exact path={routes.MANAGE_PROFILE_PLANNER} forceRefresh={true}>
            <ProjectPlannerForm
             updateProfile={props.updateProfile}
             profilePhotoUpload={props.profilePhotoUpload}
             createProfile={props.createProfile}
             handleAddressSelect={props.handleAddressSelect}
             onImageUpload={props.onImageUpload}
             isProfileImageUploading={props.isProfileImageUploading}
             profilePhotoPath={props.profilePhotoPath}
             file={props.file}
             profileImage={props.image}
             address={props.address}
             isLoading={props.isLoading}
             profileDetails={props.profileDetails}
             history={props.history}
             user={props.user}
             setBusinessProfile={props.setBusinessProfile}
             businessProfile={props.businessProfile}
            />
         </Route>
         <Route exact path={routes.MANAGE_SKILLS}>
            <EditSkillsForm
               searchText={props.searchText}
               searchInputFocus={props.searchInputFocus}
               onSkillsFocusHandler={props.onSkillsFocusHandler}
               onSkillSearchTextChangeHandler={
                  props.onSkillSearchTextChangeHandler
               }
               setWrapperRef={props.setWrapperRef}
               createSkills={props.createSkills}
               selectedSkillHandler={props.selectedSkillHandler}
               onRemoveSelectedSkills={props.onRemoveSelectedSkills}
               selectedSkills={props.selectedSkills}
               skills={props.skills}
               updateProfile={props.updateProfile}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               isConfigLoading={props.isConfigLoading}
               isSelectedSkillsUpdated={props.isSelectedSkillsUpdated}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.MANAGE_EXPERIENCE}>
            <EditExperienceForm
               updateExperience={props.updateExperience}
               createExperience={props.createExperience}
               deleteExperience={props.deleteExperience}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route exact path={routes.MANAGE_PORTFOLIO}>
            <EditPortfolioForm
               getPortfolioPresignedUrls={props.getPortfolioPresignedUrls}
               deletePortfolio={props.deletePortfolio}
               addPortfolioImages={props.addPortfolioImages}
               updateBase64={props.updateBase64}
               updatePortfolio={props.updatePortfolio}
               updateImageState={props.updateImageState}
               idsToDelete={props.idsToDelete}
               removeBase64Image={props.removeBase64Image}
               imageUrl={props.imageUrl}
               invalidPortfolioUrl={props.invalidPortfolioUrl}
               invalidVideoUrl={props.invalidVideoUrl}
               video_url={props.video_url}
               imageName={props.imageName}
               base64={props.base64}
               link_url={props.link_url}
               fieldChange={props.fieldChange}
               AllFileTypes={props.AllFileTypes}
               fileType={props.fileType}
               isLoading={props.isLoading}
               profileDetails={props.profileDetails}
               history={props.history}
               user={props.user}
            />
         </Route>
         <Route path="*" render={() => <Redirect to={routes.EDIT_PROFILE} />} />
      </Switch>
   );
};

export default profileSectionPage;
