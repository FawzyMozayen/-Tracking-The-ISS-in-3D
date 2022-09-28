import { Main, Loading, } from './components';
import { useLoading } from './lib/loading';
import {
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

function App() {
  const loading = useLoading();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}>
        </Route>
      </Routes>
      <Loading visible={loading.loading} />
    </>
  );
}

export default App;


