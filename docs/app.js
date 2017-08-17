import 'raw-loader!./index.ejs';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

import App from 'docs/components/app.component';

function init() {
	initHotModuleReplacement();
	renderApp(App);
}

function initHotModuleReplacement() {
	// Hot Module Replacement API
	if (module.hot) {
		module.hot.accept(['docs/components/app.component'], () => renderApp(App));
	}
}

function renderApp(Component) {
	render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.getElementById('root')
	);
};

init();