// Routes.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Layout & Pages
import DeletePage from "./components/delete-page/DeletePage";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import Settings from "./components/Settings/Settings";
import SubscriptionManagement from "./components/Subscription/SubscriptionManagement";
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import SuccessReset from "./pages/auth/SucessReset";
import Verify from "./pages/auth/Verify_user";
import Chats from "./pages/chats/Chats";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserManagement from "./pages/UserManagement/UserManagement";
import WorldMap from "./pages/WorldMap/WorldMap";
import Category from "./pages/category/category";
import Service from "./pages/service/Service";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Public/Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        <Route path="/auth/signup/verify" element={<Verify />} />
        <Route
          path="/auth/login/forgot_password"
          element={<ForgotPassword />}
        />
        <Route path="/auth/login/check_email" element={<CheckEmail />} />
        <Route path="/auth/login/set_password" element={<SetPassword />} />
        <Route path="/delete-account" element={<DeletePage />} />

        {/* Protected Routes inside layout */}
        {/* <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          {/* Driver Management with nested RequestTable */}
          <Route path="/support" element={<Chats />} />
          <Route path="/support/:id" element={<Chats />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="category" element={<Category />} />
          <Route path="service" element={<Service />} />
          <Route path="earning" element={<Earning />} />
          <Route path="notification" element={<Notification />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
