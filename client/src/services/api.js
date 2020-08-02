import apisauce from 'apisauce';
import { config } from 'config'
import { setItem, getItem } from 'utils/localstorage-utils'
import actions from 'redux/actions'
import { store } from 'store'

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
      console.log(response)
      console.log(response.status)
      if (response.status === 401)
      store.dispatch(actions.logOut())
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