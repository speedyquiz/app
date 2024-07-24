/* eslint-disable import/no-unresolved */
import { combineReducers } from 'redux';
import authModuleReducer from 'src/module/auth-module/reducer/reducer';
import cmsModuleReducer from 'src/module/cms-module/reducer/reducer';
import memberManagementModuleReducer from 'src/module/memeberManagement-module/reducer/reducer';
import myAccountModuleReducer from 'src/module/myAccount-module/reducer/reducer';
import quizCategoryModuleReducer from 'src/module/quizCategory-module/reducer/reducer';
import quizQuestionManagementModuleReducer from 'src/module/quizQuestionManagement-module/reducer/reducer';
import quizTemplateManagementModuleReducer from 'src/module/quizTemplateManagement-module/reducer/reducer';
import winnerManagementModuleReducer from 'src/module/winnerManagement-module/reducer/reducer';

export const combinedReducer = combineReducers({
  authModule: authModuleReducer,
  quizCategoryModule:quizCategoryModuleReducer,
  quizQuestionManagementModule:quizQuestionManagementModuleReducer,
  myAccountModule:myAccountModuleReducer,
  quizTemplateManagementModule:quizTemplateManagementModuleReducer,
  memberManagementModule:memberManagementModuleReducer,
  cmsModule:cmsModuleReducer ,
  winnerManagementModule:winnerManagementModuleReducer ,
});

export default combinedReducer;
