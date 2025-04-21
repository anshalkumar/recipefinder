import logo from './logo.svg';
import './App.css';
import {Routes , Route , BrowserRouter} from 'react-router-dom';
import Search from './components/Search';
import AvailableItems from './components/AvailableItems';
import AvailableItemsContext, { AvailableItemsProvider } from './components/AvailableItemsContext';

function App() {
  return (
    <AvailableItemsProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/Available" element={<AvailableItems />} />
        
      </Routes>
    </BrowserRouter>
    </AvailableItemsProvider>
  );
}

export default App;
