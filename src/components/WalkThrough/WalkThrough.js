import React, { useState } from 'react';
import Tour from 'reactour';
import Quickstart from '../Quickstart/Quickstart';
import $ from 'jquery';
import { useEffect } from 'react';
import { routes, walkThroughTypes } from '../../utility/constants/constants';
import { useRef } from 'react';
import storage from '../../utility/storage';

const WalkThrough = ({
  onThirdStep,
  onStepChange,
  goToStep,
  history,
  handleStepUpdate,
  quickstartItems,
  updateQuickstartItems
}) => {
  const [tourToggle, setTourToggle] = useState(false);
  const [tourSteps, setTourSteps] = useState(walkThroughTypes);
  const [activeStep, setActiveStep] = useState(0);
  const [currentFlow, setCurrentFlow] = useState('');
  const [setCount, setStepCount] = useState('');
  const [totalSteps, setTotalSteps] = useState('')
  const [activeTour, setActiveTour] = useState('')
  const [currentActiveKey, setCurrentActiveKey] = useState('')

  console.log('onThrid', onThirdStep);

  // useEffect(() => {
  //   if (onThirdStep) {
  //     setActiveStep(2);
  //     setLoaded(true);

  //   }
  // }, [onThirdStep]
  //  )

  useEffect(() => {
    if (goToStep && activeStep !== goToStep.steps) {
      setActiveStep(goToStep.steps);
    }
  }, [goToStep]);

  const openTour = (args, flowOfWalkSteps, steps, type, activeKey) => {
    if (type === walkThroughTypes.PRIMARY_PROFILE_CREATE.title) {
      $('.my-drop').removeClass('dropdown');
      $('.my-drop .list_walkThrough').attr('id', 'manage_profile_btn_walk');
      $('.my-drop .project_plan_walk').attr(
        'id',
        'manage_project_plan_btn_walk',
      );
      $('.my-drop .dropdown-menu').addClass('show');
    }
    if (type === walkThroughTypes.PLAN_YOUR_PROJECT.title) {
      $('.my-drop').removeClass('dropdown');
      $('.my-drop .list_walkThrough').attr('id', 'manage_profile_btn_walk');
      $('.my-drop .project_plan_walk').attr(
        'id',
        'manage_project_plan_btn_walk',
      );
      $('.my-drop .dropdown-menu').addClass('show');
    }
    if (type === walkThroughTypes.CREATE_MORE_PROFILES.title) {
      $('.my-drop').removeClass('dropdown');
      $('.my-drop .list_walkThrough').attr('id', 'manage_profile_btn_walk');
      $('.my-drop .project_plan_walk').attr(
        'id',
        'manage_project_plan_btn_walk',
      );
      $('.my-drop .dropdown-menu').addClass('show');
    }
    setTourToggle(true);
    setTourSteps(args);
    setCurrentFlow(flowOfWalkSteps);
    setActiveTour(type)
    setTotalSteps(args.length)
    setCurrentActiveKey(activeKey)

    setStepCount(steps);
    setActiveStep(0);
  };

  const closeTour = () => {
    setTourToggle(false);
    $('.my-drop').addClass('dropdown');
    $('.my-drop .dropdown-menu').removeClass('show');
    handleStepUpdate(0);
    if ($('#click').css('display') === 'block') {
      $('#click').click()
    }
    storage.remove('activeTour')
    // $(".dropdown-menu.dropDown_walk").removeClass("show");
  };
  const accentColor = '#5cb7b7';

  const handleStep = e => {
    if (goToStep && goToStep.steps === 101) {
      closeTour()
    }
    if (e === 1 || (e === (totalSteps - 1))) {
      let quickstart = {
        ...quickstartItems,
        [currentActiveKey]: true
      }
      storage.set('quickstart', quickstart)
      updateQuickstartItems(quickstart)
    }
    if (e === (totalSteps - 1) && e === activeStep) {
      closeTour()
    }
    setActiveStep(e);
    if (activeTour === walkThroughTypes.CREATE_MORE_PROFILES.title && e === 1) {
      $('.my-drop').addClass('dropdown');
      $('.my-drop .dropdown-menu').removeClass('show');
    }
    if (activeTour === walkThroughTypes.SEARCH_FOR_WHAT_YOU_NEED.title && e === 3) {
      if (history.location.pathname.includes('details')) {
        closeTour()
      }
    }
    if (currentFlow === walkThroughTypes.POST_A_WANT_AD.title) {
      if (e === 1) {
        $('[data-tour-elem="right-arrow"]').addClass('disableNext');
      } else {
        $('[data-tour-elem="right-arrow"]').removeClass('disableNext');
      }
    } else if (e === 1 && currentFlow && setCount) {
      $('[data-tour-elem="right-arrow"]').removeClass('disableNext');
    } else if (e === 1 && setCount) {
    } else if (e === 1 && currentFlow) {
    } else {
      $('.my-drop .dropdown-menu').removeClass('show');
      $('.my-drop').addClass('dropdown');
      $('[data-tour-elem="right-arrow"]').removeClass('disableNext');
    }
  };

  return (
    <div>
      <Quickstart openTour={openTour}></Quickstart>
      <Tour
        maskClassName="react_tour_guide_svg_wrapper"
        closeWithMask={false}
        getCurrentStep={handleStep}
        onRequestClose={closeTour}
        steps={tourSteps}
        goToStep={activeStep}
        isOpen={tourToggle}
        disableDotsNavigation={true}
        showNavigation={false}
        showButtons={false}
        disableKeyboardNavigation={true}
        startAt={0}
        className="helper"
        prevButton="Previous"
        nextButton="Next"
        lastStepNextButton={
          <button className="exit-btn-walkThrough">Exit</button>
        }
        accentColor={accentColor}
      />
    </div>
  );
};

export default WalkThrough;
