import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReceiptView = () => {
	const { id } = useParams();
	const [receipt] = useState({
		// This would typically be fetched from your backend
		id: 1,
		receiptNumber: 'RCP-001',
		invoiceNumber: 'INV-001',
		clientName: 'John Doe',
		amount: 1500,
		paymentDate: '2024-01-25',
		paymentMethod: 'Credit Card',
	});

	return (
		<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">RECEIPT</h1>
				<p className="text-gray-600">#{receipt.receiptNumber}</p>
			</div>

			<div className="border-t border-b border-gray-200 py-4 mb-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-gray-600">Date:</p>
						<p className="font-semibold">{receipt.paymentDate}</p>
					</div>
					<div>
						<p className="text-gray-600">Invoice Reference:</p>
						<p className="font-semibold">#{receipt.invoiceNumber}</p>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-2">Received From:</h2>
				<p className="text-gray-600">{receipt.clientName}</p>
			</div>

			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-2">Payment Details:</h2>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-gray-600">Amount Paid:</p>
						<p className="font-semibold">${receipt.amount.toFixed(2)}</p>
					</div>
					<div>
						<p className="text-gray-600">Payment Method:</p>
						<p className="font-semibold">{receipt.paymentMethod}</p>
					</div>
				</div>
			</div>

			<div className="text-center mt-8">
				<p className="text-gray-600">Thank you for your payment!</p>
				<button
					onClick={() => window.print()}
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				>
					Print Receipt
				</button>
			</div>
		</div>
	);
};

export default ReceiptView;