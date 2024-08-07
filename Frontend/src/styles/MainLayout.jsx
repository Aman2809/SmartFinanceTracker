// MainLayout.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Income from './Income';
import Expenses from './Expenses'; // Example component

function MainLayout() {
  const [active, setActive] = useState('');

  return (
    <Router>
      <LayoutStyled>
        <Navigation active={active} setActive={setActive} />
        <ContentStyled>
          <Routes>
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            {/* Add other routes as needed */}
          </Routes>
        </ContentStyled>
      </LayoutStyled>
    </Router>
  );
}
