/* eslint-disable import/no-unresolved */
import { all } from 'redux-saga/effects';
import authModuleSaga from 'src/module/auth-module/saga/saga';
import cmsModuleSaga from 'src/module/cms-module/saga/saga';
import memberManagementModuleSaga from 'src/module/memeberManagement-module/saga/saga';
import myAccountModuleSaga from 'src/module/myAccount-module/saga/saga';
import quizCategoryModuleSaga from 'src/module/quizCategory-module/saga/saga';
import quizQuestionManagementModuleSaga from 'src/module/quizQuestionManagement-module/saga/saga';
import quizTemplateManagementModuleSaga from 'src/module/quizTemplateManagement-module/saga/saga';
import winnerManagementModuleSaga from 'src/module/winnerManagement-module/saga/saga';
import trackPayoutManagementModuleSaga from 'src/module/trackpayout-module/saga/saga';
import faqModuleSaga from 'src/module/faq-module/saga/saga';
import videoModuleSaga from 'src/module/video-module/saga/saga';
import pointModuleSaga from 'src/module/pointManagement-module/saga/saga';
import carouselModuleSaga from 'src/module/carouselImage/saga/saga';

export default function* rootSaga() {
  yield all([
    authModuleSaga(),
    quizCategoryModuleSaga(),
    quizQuestionManagementModuleSaga(),
    myAccountModuleSaga(),
    quizTemplateManagementModuleSaga(),
    memberManagementModuleSaga(),
    cmsModuleSaga(),
    winnerManagementModuleSaga(),
    trackPayoutManagementModuleSaga(),
    faqModuleSaga(),
    videoModuleSaga(),
    pointModuleSaga(),
    carouselModuleSaga()
  ]);
}
