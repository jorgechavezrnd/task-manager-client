import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppStack from './components/App/AppStack.js';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppStack />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
