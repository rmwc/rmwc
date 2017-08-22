export const propMeta = meta => {
	return process.env.NODE_ENV === 'production' ? {} : meta;
};