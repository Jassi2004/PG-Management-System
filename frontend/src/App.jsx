// App.js

import { ColorModeProvider } from './context/ColorModeContext'; // Import the ColorModeProvider
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes';

const App = () => {
  return (
    <ColorModeProvider>  {/* Wrap the whole app in ColorModeProvider */}
      <>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <main style={{ flexGrow: 1, padding: '20px' }}>
            <AppRoutes />
          </main>
        </div>
      </>
    </ColorModeProvider>
  );
};

export default App;
