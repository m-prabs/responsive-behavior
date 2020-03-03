import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
const { COMPONENT_RENDERED } = actionTypes;
import responsive from "../behavior/responsive";
import styles from "./styles.scss";
import view from "./view";

const captureMcq = coeffects => {
	let {
		updateState,
		action: { payload }
	} = coeffects;
	updateState({ mediaChangeObserver: payload });
	//addListeners(coeffects);
};

const getCssStyleObject = str => {
	return { display: "flex", "flex-flow": str };
};
const generateStyleMap = node => {
	let nodeAttributeMap = new Map(Object.entries(node));
	let styleMap = new Map();
	nodeAttributeMap.forEach((val, key) => {
		if (key.includes("fxContainer")) {
			let keys = key.split("fxContainer");
			if (keys[1] == "") styleMap.set("all", getCssStyleObject(val));
			else styleMap.set(keys[1].toLowerCase(), getCssStyleObject(val));
		}
	});
	node.styleMap = styleMap;
};

const generateInlineStyles = obj => {
	if (!obj) return;
	let style = "";
	Object.entries(obj).map(([key, val]) => (style += key + ":" + val + ";"));
	return style;
};

const applyStyles = (node, mediaCode = "all") => {
	node.setAttribute(
		"style",
		generateInlineStyles(node.styleMap.get(mediaCode))
	);
};

const updateStyles = (mc, { node }) => {
	if (mc.active) {
		applyStyles(node, mc.alias);
	} else applyStyles(node);
};

const addListeners = ({ state, host }) => {
	let node = host.shadowRoot.querySelector(".fx-container");
	generateStyleMap(node);
	applyStyles(node);
	if (!state.mediaChangeObserver) return;
	let deReg = state.mediaChangeObserver.register(
		{
			node,
			update: updateStyles
		},
		Array.from(node.styleMap.keys()).filter(val => val != "all")
	);
	//deReg();
};

createCustomElement("sn-test-comp", {
	renderer: { type: snabbdom },
	view,
	behaviors: [responsive],
	styles,
	properties: {
		containerStyle: {
			default: new Map([
				["display", "flex"],
				["flex-direction", "row"]
			])
		}
	},
	actionHandlers: {
		["NOW_RESPONSIVE_BEHAVIOR_READY"]: captureMcq,
		[COMPONENT_RENDERED]: addListeners
	}
});
