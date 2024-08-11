const dev = process.env['NODE_ENV'] === 'development';

const _url = (action: any, query: any = '') => {
	if (dev) {
		return `http://10.171.0.12/komus_career_app/api/controller.html?action=${ action }${
			query && '&' + query
		}`;
	}
	return `/komus_career_app/api/controller.html?action=${ action }${
		query && '&' + query
	}`;
};

export { _url };
