import './styles/global.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import HomeView from './views/HomeView';
import ProgramsView from './views/ProgramsView';
import UniversitiesView from './views/UniversitiesView';
import SkillsView from './views/SkillsView';
import ProfileView from './views/ProfileView';
import UniversityDetail from './views/UniversityDetail';
import ProgramDetail from './views/ProgramDetail';
import SkillDetail from './views/SkillDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/programs" element={<ProgramsView />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/universities" element={<UniversitiesView />} />
          <Route path="/universities/:id" element={<UniversityDetail />} />
          <Route path="/skills" element={<SkillsView />} />
          <Route path="/skills/:id" element={<SkillDetail />} />
          <Route path="/profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
