import apisauce from 'apisauce';
import { config } from 'config'
const { serverUrl, environment } = config()

const create = () => {
  var init = (path = "/api/v1/") => {
    let apis = apisauce.create({
      baseURL: `${serverUrl}${path}`,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
      },
      timeout: 30000,
    });
    apis.addRequestTransform(request => {

    });

    apis.addResponseTransform(response => {
  
    });
    return apis;
  }

  return {}
}
export default { create };