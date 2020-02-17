import { actionTypes } from "@servicenow/ui-core";
const { COMPONENT_DOM_READY } = actionTypes;
import mediaChangeObserver from "./observer";
import { BEHAVIOR_READY } from "./constants";

const init = ({ dispatch }) => {
	dispatch(BEHAVIOR_READY, mediaChangeObserver);
};

const responsive = {
	name: "responsive",
	properties: {},
	initialState: {},
	actionHandlers: {
		[COMPONENT_DOM_READY]: init
	}
};

export default responsive;
