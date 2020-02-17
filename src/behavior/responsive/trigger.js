import { notifyObservers, getObserversList } from "./observer";

const filterdObserverList = (obs, bp) =>
	obs.filter(ob => ob.mediaCodes.indexOf(bp.alias) > -1);

const notify = (obs, bp, val) => notifyObservers(obs, { ...bp, active: val });

export default (mql, breakPoint) => {
	let obs = filterdObserverList(getObserversList(), breakPoint);
	if (mql.matches) notify(obs, breakPoint, true);
	else notify(obs, breakPoint, false);
};
