import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceView from './components/InvoiceView';
import ReceiptView from './components/ReceiptView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create-invoice" element={<InvoiceForm />} />
            <Route path="/invoice/:id" element={<InvoiceView />} />
            <Route path="/receipt/:id" element={<ReceiptView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

