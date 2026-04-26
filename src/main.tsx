import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CollectionsProvider } from './context/CollectionsContext';
import App from './App';
import CreateCollection from './pages/CreateCollection';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import NotFound from './pages/NotFound';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <CollectionsProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateCollection />} />
          <Route path="/collection/:id/add" element={<AddItem />} />
          <Route path="/collection/:id/edit/:itemId" element={<EditItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CollectionsProvider>
    </Router>
  </React.StrictMode>
);
