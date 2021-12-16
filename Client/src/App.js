import Router from './routes';
import ThemeConfig from './theme';

// components
import Snackbar from './components/Snackbar';
// hooks
import useAuth from './hooks/useAuth';
// pages
import Loading from './pages/Loading';

const App = () => {
  const { isInitialized } = useAuth();
  return (
    <ThemeConfig>
      <Snackbar />
      {isInitialized ? <Router /> : <Loading />}
    </ThemeConfig>
  );
};

export default App;
