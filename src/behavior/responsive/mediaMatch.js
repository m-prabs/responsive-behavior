import {
	SM_BREAK_POINT,
	MD_BREAK_POINT,
	LG_BREAK_POINT,
	XLG_BREAK_POINT,
	XS_CODE,
	SM_CODE,
	MD_CODE,
	LG_CODE,
	XLG_CODE
} from "./constants";

export const mediaCodesArray = [XS_CODE, SM_CODE, MD_CODE, LG_CODE, XLG_CODE];
export const breakPointsMap = new Map();
export const mediaQueryListMap = new Map();

// Generates BP Map
[0, SM_BREAK_POINT, MD_BREAK_POINT, LG_BREAK_POINT, XLG_BREAK_POINT].map(
	(bp, i, a) => {
		let obj = {},
			min = bp,
			max = i + 1 < a.length ? a[i + 1] - 0.1 : null,
			query = "screen and (min-width: " + min + "px)";
		if (max) query += " and (max-width: " + max + "px)";

		obj.alias = mediaCodesArray[i].toLowerCase();
		obj.priority = i * 100;
		obj.mediaQuery = query;
		breakPointsMap.set(obj.alias.toLowerCase(), obj);
	}
);

// Generate Media Query List map
breakPointsMap.forEach((bp, code) =>
	mediaQueryListMap.set(code, window.matchMedia(bp.mediaQuery))
);
