import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AuthPage from './pages/auth/authPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Dashboard/Home';
import Tests from './pages/Dashboard/Tests/Tests';
import TestsThread from './pages/Dashboard/Tests/TestsThread';
import TestPreviewRules from './pages/Dashboard/Tests/TestPreviewRules';
import TestSessionPage from './pages/Dashboard/Tests/TestSessionPage';
import Discover from './pages/Dashboard/Discover';
import Analytics from './pages/Dashboard/Analytics';
import TestAnalyticsPage from './pages/TestAnalyticsPage';
import Account from './pages/Dashboard/Account';
import Settings from './pages/Dashboard/Settings';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Test Session - Full screen, no sidebar */}
      <Route path="/test/:threadId" element={
        <ProtectedRoute>
          <TestSessionPage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/thread/:threadId" element={<TestsThread />} />
        <Route path="tests/thread/:threadId/preview" element={<TestPreviewRules />} />
        <Route path="discover" element={<Discover />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/:testId" element={<TestAnalyticsPage />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
