import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateCollection from './pages/CreateCollection';
import NotFound from './pages/NotFound';
import { CollectionsProvider } from './context/CollectionsContext';

export default function Root() {
  return (
    <BrowserRouter>
      <CollectionsProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateCollection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CollectionsProvider>
    </BrowserRouter>
  );
}
