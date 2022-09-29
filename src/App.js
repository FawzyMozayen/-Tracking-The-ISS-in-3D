import { Main, Loading, } from './components';
import { useLoading } from './lib/loading';
import {
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About/About';
import History from './components/History/History';

function App() {
  const loading = useLoading();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Loading visible={loading.loading} />
    </>
  );
}

export default App;


