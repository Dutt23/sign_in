
const ENV = {
	env: "development",
	
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
    serverUrl: 'http://localhost:5000',
  },
  production: {
    environment: 'production',
    allowTextFontScaling: true,
    serverUrl: 'http://localhost:5000',
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
