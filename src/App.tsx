import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage, InstructionsPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
