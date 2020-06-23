import { takeLatest, all } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
import {UserTypes} from '../Redux/UserRedux';
import {ResetPasswordTypes} from '../Redux/ResetPasswordRedux';
import {RegisterTypes} from '../Redux/RegisterRedux';
import {SocialRegisterTypes} from '../Redux/SocialRegisterRedux';
import {SocialLoginTypes} from '../Redux/SocialLoginRedux';
import {ChangePasswordTypes} from '../Redux/ChangePasswordRedux';
import {PhotoTypes} from '../Redux/PhotoRedux';

/* ------------- Sagas ------------- */

import { startup } from "./StartupSagas";
import {login, logout, reset} from './UserSagas';
import {register} from './RegisterSagas';
import {getSocialRegister} from './SocialRegisterSagas';
import {getSocialLogin} from './SocialLoginSagas';
import {getChangePassword} from './ChangePasswordSagas';
import {resetPassword, saveNewPassword} from "./ResetPasswordSagas";
import {savePhoto} from "./PhotoSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(UserTypes.USER_REQUEST, login, api),
    takeLatest(UserTypes.USER_LOGOUT, logout),
    takeLatest(UserTypes.USER_RESET, reset),
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
    takeLatest(ResetPasswordTypes.SAVE_NEW_PASSWORD_REQUEST, saveNewPassword, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(
      SocialRegisterTypes.SOCIAL_REGISTER_REQUEST,
      getSocialRegister,
      api,
    ),
    takeLatest(SocialLoginTypes.SOCIAL_LOGIN_REQUEST, getSocialLogin, api),
    takeLatest(
      ChangePasswordTypes.CHANGE_PASSWORD_REQUEST,
      getChangePassword,
      api,
    ),
    takeLatest(PhotoTypes.SAVE_PHOTO_REQUEST, savePhoto, api),
  ]);
}
