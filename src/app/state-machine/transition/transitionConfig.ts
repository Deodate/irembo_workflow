export type Transition = {
    event: string;
    startState: string;
    endStateOne: {
      nextEvent: string | null;
      stateCode: string;
      stateName: string;
      breakingAction: {
        args: any | null;
        actionType: string;
      } | null;
      nonBreakingActionList: {
        args: any;
        actionType: string;
      }[] | null;
    };
    endStateTwo: {
      nextEvent: string | null;
      stateCode: string;
      stateName: string;
      breakingAction: {
        args: any | null;
        actionType: string;
      } | null;
      nonBreakingActionList: {
        args: any;
        actionType: string;
      }[] | null;
    } | null;
  }[];
  
  export type TransitionConfig = Transition[];
  