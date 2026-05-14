import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./views/Home";
import Character from "./views/Character";
import Relic from "./views/Relic";
import Matter from "./views/Matter";
import Mechanic from "./views/Mechanic";
import TrialWarp from "./views/TrialWarp";
import CharacterDetail from "./components/CharacterDetail";
import RelicDetail from "./components/RelicDetail";
import MatterDetail from "./components/MatterDetail";

function App() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#040918] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.08),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%)]" />
      </div>

      <div className="relative flex h-full flex-col">
        <NavBar />
        <main className="app-main-scroll h-[calc(100vh-4.5rem)] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/characters" element={<Character />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/relics" element={<Relic />} />
            <Route path="/relic/:id" element={<RelicDetail />} />
            <Route path="/matters" element={<Matter />} />
            <Route path="/matter/:id" element={<MatterDetail />} />
            <Route path="/gameplay" element={<Mechanic />} />
            <Route path="/trialwarps" element={<TrialWarp />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
