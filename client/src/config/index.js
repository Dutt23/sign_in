
const ENV = {
	env: "staging",
	
  development: {
    environment: 'development',
    allowTextFontScaling: true,
    // serverUrl: 'https://dev.goodforme.ai',
    serverUrl:'http://localhost:5000',
    yellowBox: false,
    reduxLogging: false,
    includeExamples: false,
  },
  staging: {
    environment: 'staging',
    allowTextFontScaling: true,
    serverUrl: 'https://goodforme.ai',
  },
  production: {
    environment: 'production',
    allowTextFontScaling: true,
    serverUrl: 'https://foodrx.3tandai.com',
  }
}

export const config = (env = ENV.env) => {
  if (env === "development") {
    return ENV.development;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'production') {
    return ENV.production;
  }
};
