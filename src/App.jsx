import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceList from './pages/InvoiceList';
import InvoiceView from './pages/InvoiceView';
import ReceiptView from './pages/ReceiptView';
import RegisterInvoiceForm from './pages/Form';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/add-new" element={<RegisterInvoiceForm />} />
            <Route path="/create-invoice" element={<InvoiceForm />} />
            <Route path="/invoice/:invoice_id" element={<InvoiceView />} />
            <Route path="/receipt/:id" element={<ReceiptView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

