import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthWrapper } from './contexts/AuthContext';

function App() {

  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <RouterProvider router={router} />
        </AuthWrapper>
      </QueryClientProvider>
    </div>
  );
}

export default App;
