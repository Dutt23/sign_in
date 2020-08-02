import apisauce from 'apisauce';
import { config } from 'config'
import { setItem, getItem } from 'utils/localstorage-utils'

const { serverUrl, environment } = config()

const create = () => {
  var init = (path = "/api/v1/") => {
    let apis = apisauce.create({
      baseURL: `${serverUrl}${path}`,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'x-auth-token': getItem('token')
      },
      timeout: 30000,
    });
    apis.addRequestTransform(request => {
    });

    apis.addResponseTransform(response => {

    });
    return apis;
  }

  const signUp = (payload) => init().post('users/sign_up', payload, {})
  const fetchUser = () => init().get('auth', {}, {})
  return {
    signUp,
    fetchUser
  }
}
export default { create };