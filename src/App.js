/* eslint-disable react/prop-types */
// import { Navigate } from 'react-router-dom';
// layouts
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import LoginPage from './module/auth-module/components/LoginPage';
import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import WinnerManagementPage from './module/winnerManagement-module/components/WinnerManagementPage';
// import TracksPayoutsPage from './pages/TracksPayoutsPage';
import TracksPayoutsPage from './module/trackpayout-module/components/TracksPayoutsPage';
import QuizCategoryManagementPage from './module/quizCategory-module/components/QuizCategoryManagementPage';
import QuizQuestionManagementPage from './module/quizQuestionManagement-module/components/QuizQuestionManagementPage';
import QuizTemplateManagement from './module/quizTemplateManagement-module/components/QuizTemplateManagement';
import CarouselImageComponent from './module/carouselImage/components/CarouselImageComponent';
import ContentManagementSystemPage from './module/cms-module/components/ContentManagementSystemPage';
import MyAccountPage from './module/myAccount-module/components/MyAccountPage';
import { routesName } from './constant/routes/routesPath';
import MemberManagementPage from './module/memeberManagement-module/components/MemberManagementPage';
import FaqPage from './module/faq-module/components/FaqPage';
import VideoPage from './module/video-module/components/VideoPage';
import PointPage from './module/pointManagement-module/components/PointPage';

function ProtectedRoute({ element }) {
  // Check if the token is present in session storage
  const token = localStorage.getItem("token");
  // If the token is not present, navigate to the login page
  if (!token) {
    return <Navigate to={routesName.login} />;
  }

  // If the token is present, allow access to the protected route
  return <>{element}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path={routesName.login} element={<LoginPage />} />

      {/* Use the ProtectedRoute component for the protected section */}
      <Route path={routesName.dashboard} element={<ProtectedRoute element={<DashboardLayout />} />}>
        <Route index element={<Navigate to={routesName.dashboardApp} />} />
        <Route path={routesName.dashboardApp} element={<DashboardAppPage />} />
        <Route path={routesName.memberManagement} element={<MemberManagementPage />} />
        <Route path={routesName.winnerManagement} element={<WinnerManagementPage />} />
        <Route path={routesName.trackPayout} element={<TracksPayoutsPage />} />
        <Route path={routesName.quizCategoryManagement} element={<QuizCategoryManagementPage />} />
        <Route path={routesName.quizQuestionManagement} element={<QuizQuestionManagementPage />} />
        <Route path={routesName.quizTemplateManagement} element={<QuizTemplateManagement />} />
        <Route path={routesName.carouselImage} element={<CarouselImageComponent />} />
        <Route path={routesName.contentManagementSystem} element={<ContentManagementSystemPage />} />
        <Route path={routesName.faq} element={<FaqPage />} />
        <Route path={routesName.video} element={<VideoPage />} />
        <Route path={routesName.point} element={<PointPage />} />
        <Route path={routesName.myAccount} element={<MyAccountPage />} />
      </Route>

      <Route path="/404" element={<SimpleLayout />}>
        <Route index element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      {/* Use the ProtectedRoute component for all other routes */}
      <Route path="*" element={<ProtectedRoute element={<Navigate to="/404" replace />} />} />
    </Routes>
  );
}