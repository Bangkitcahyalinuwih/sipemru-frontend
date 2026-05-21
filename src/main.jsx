import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-datepicker/dist/react-datepicker.css";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0B0B12]">
    <div className="text-gray-400">Loading...</div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </React.StrictMode>,
  );
} else {
  root.render(
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>,
  );
}