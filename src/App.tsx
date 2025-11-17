import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppStore } from './stores/appStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import BayesianSimulator from './pages/BayesianSimulator';
import FaganNomogram from './pages/FaganNomogram';
import ROCExplorer from './pages/ROCExplorer';
import PPVNPVExplorer from './pages/PPVNPVExplorer';
import TestCascade from './pages/TestCascade';
import StewardshipCases from './pages/StewardshipCases';
import CaseViewer from './pages/CaseViewer';
import LearningModules from './pages/LearningModules';
import ModuleViewer from './pages/ModuleViewer';
import Assessment from './pages/Assessment';
import AssessmentQuiz from './pages/AssessmentQuiz';
import Glossary from './pages/Glossary';
import Settings from './pages/Settings';

function App() {
  const darkMode = useAppStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bayesian" element={<BayesianSimulator />} />
          <Route path="/fagan" element={<FaganNomogram />} />
          <Route path="/roc" element={<ROCExplorer />} />
          <Route path="/ppv-npv" element={<PPVNPVExplorer />} />
          <Route path="/cascade" element={<TestCascade />} />
          <Route path="/stewardship" element={<StewardshipCases />} />
          <Route path="/stewardship/case/:caseId" element={<CaseViewer />} />
          <Route path="/modules" element={<LearningModules />} />
          <Route path="/modules/:moduleId" element={<ModuleViewer />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/:assessmentId" element={<AssessmentQuiz />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
