export const propMeta = meta => {
	// I was assuming this would drop unused code in production. It does not.
	//return process.env.NODE_ENV === 'production' ? {} : meta;
	return meta;
};