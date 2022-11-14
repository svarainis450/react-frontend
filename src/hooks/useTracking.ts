import TagManager from "react-gtm-module";

export const useTracking = () => {

  const trackQuizAnswer = (category: string, value: string) => {
    TagManager.dataLayer({ 
      dataLayer: {
        event: 'quiz_question_answered',
        category,
        value
      }
    })
  }

  return {
    trackQuizAnswer
  };
};
