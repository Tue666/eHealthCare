import Router from './routes';
import ThemeConfig from './theme';

// components
import Snackbar from './components/Snackbar';
import Modal from './components/Modal';
// hooks
import useAuth from './hooks/useAuth';
// pages
import Loading from './pages/Loading';

const App = () => {
  const { isInitialized } = useAuth();
  return (
    <ThemeConfig>
      <Snackbar />
      <Modal />
      {isInitialized ? <Router /> : <Loading />}
    </ThemeConfig>
  );
};

export default App;
