import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
          <Route
            path="/rq-super-heroes"
            element={<RQSuperHeroesPage />}
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
