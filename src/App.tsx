import { useState } from 'react'; 
import MainLayout from './components/Layout/MainLayout';  

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
 
  return (
    <div className="h-screen">
      <MainLayout 
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
      />
    </div>
  );
}

export default App;