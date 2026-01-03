import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserPage />} />

        <Route path="/" element={<Navigate to="/users" replace />} />

        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-slate-800">404</h1>
            <p className="text-slate-600">Page not found</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;