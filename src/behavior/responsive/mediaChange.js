import {
	mediaQueryListMap,
	breakPointsMap,
	mediaCodesArray
} from "./mediaMatch";
import trigger from "./trigger";

const mqlListenerMap = new Map();

export const verifyMediaCodes = mCodes =>
	mCodes.reduce((acc, code) => acc && mediaCodesArray.indexOf(code) > -1, true);

// Adds Media Change watcher
export const watchMediaChange = mCodes => {
	mCodes.map(mCode => {
		if (!mqlListenerMap.get(mCode)) {
			mqlListenerMap.set(mCode, addMediaQueryListener(mCode));
		}
	});
};

const makeCurrey = (cb, item) => arg => cb(arg, item);

// Register media query listener
const addMediaQueryListener = mediaCode => {
	let mql = mediaQueryListMap.get(mediaCode),
		bp = breakPointsMap.get(mediaCode);
	trigger(mql, bp);
	return mql.addListener(makeCurrey(trigger, bp));
};
