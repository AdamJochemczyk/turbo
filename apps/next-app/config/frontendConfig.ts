import ThirdPartyWebJs from 'supertokens-web-js/recipe/thirdparty'
import SessionWebJs from 'supertokens-web-js/recipe/session'
import { appInfo } from './appInfo'

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyWebJs.init(),
      SessionWebJs.init(),
    ],
  }
}