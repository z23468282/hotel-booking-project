import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AppContextProvider } from './contexts/AppContext.tsx';

const queryClient = new QueryClient({
  //創建客戶端
  //使用以下設定設定初始值，會自動套用
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </QueryClientProvider>
);
