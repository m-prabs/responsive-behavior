import { mediaCodesArray } from "./mediaMatch";
import { verifyMediaCodes, watchMediaChange } from "./mediaChange";
/**
 * @name MediaChangeObserver
 * @property {Function} register
 * @usage MediaChangeObserver.register(Observer)
 *
 * @description
 * Expects an 'update' function on the Observer object
 * which is called with the Media Change object and Observer object.
 * Observer : {
 *    update : callBack,
 *    <any other property Observer wants to pass for its own reference>
 * }
 */

// ObserverList
let observers = [];

const verifyAndAdd = (ob, mCodes = mediaCodesArray) => {
	let mCodeArray = (Array.isArray(mCodes) ? mCodes : [mCodes]).map(code =>
		code.toLowerCase()
	);
	if (verifyMediaCodes(mCodeArray)) {
		ob.mediaCodes = mCodeArray;
	} else return { error: "Invalid media codes" };
	return addObserver(ob);
};

/**
 * Adds an observer to the List
 * @param {Object} observer
 * @returns {Function} a deRegister function to detach the observer
 */
const addObserver = ob => {
	observers.push(ob);
	watchMediaChange(ob.mediaCodes);
	return () => removeObserver(ob);
};

/**
 * Removes an observer from List
 * @param {Object} observer
 */
const removeObserver = ob => {
	let index = observers.indexOf(ob);
	if (index > -1) observers.splice(index, 1);
};

export const getObserversList = () => observers;

/**
 * Notifies Observers of the change.
 * @param {Object} Observers to notify
 * @param {Object} mediaChangeObject containing changed media info
 * @param {Boolean} value
 */
export const notifyObservers = (observersList, mediaChangeObject, value) => {
	observersList.map(ob => ob.update(mediaChangeObject, ob));
};

export default {
	register: verifyAndAdd,
	mediaCodes: mediaCodesArray
};
