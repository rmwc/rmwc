import React from 'react';
import {transform} from 'babel-core';
import babelPresetReact from 'babel-preset-react';

export const buildJSXWithContext = (string, thisContext, contextArgs = {}) => {
	const babelOpts = {
		presets: [babelPresetReact]
	};

	const codeString = transform(`<div>${string || ''}</div>`, babelOpts).code;
	contextArgs.React = contextArgs.React || React;

	return (new Function(
		...Object.keys(contextArgs),
		`${codeString.replace('React.createElement', 'return React.createElement')}`
	)).call(thisContext, ...Object.values(contextArgs));
};

export default buildJSXWithContext;