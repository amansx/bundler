import React from 'react';
import rdom  from 'react-dom';

import AppAnalytics from './analytics';
const Analytics = new AppAnalytics((msg) => console.log(msg))

setTimeout(() => {
	Analytics.transport().info("Hello world 11%s", "aman");
	Analytics.transport().debug("Hello world 22%s", "aman");
}, 2000);

rdom.render(<h1>Hello World</h1>, document.getElementById("app"))