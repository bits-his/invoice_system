import { useState } from 'react';
import { useParams } from 'react-router-dom';

const InvoiceView = () => {
	const { id } = useParams();
	const [invoice] = useState({
		// This would typically be fetched from your backend
		id: 1,
		invoiceNumber: 'INV-001',
		clientName: 'John Doe',
		clientEmail: 'john@example.com',
		clientAddress: '123 Main St, City, Country',
		items: [
			{ description: 'Web Development', quantity: 1, price: 1000 },
			{ description: 'Design Services', quantity: 2, price: 250 },
		],
		notes: 'Thank you for your business!',
		status: 'pending',
		date: '2024-01-20',
		dueDate: '2024-02-20',
	});

	const calculateTotal = () => {
		return invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
	};

	const handleMarkAsPaid = () => {
		// This would typically update the backend
		console.log('Marking invoice as paid:', id);
	};

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
			<div className="flex justify-between items-start mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
					<p className="text-gray-600">#{invoice.invoiceNumber}</p>
				</div>
				<div className="text-right">
					<p className="text-gray-600">Date: {invoice.date}</p>
					<p className="text-gray-600">Due Date: {invoice.dueDate}</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8 mb-8">
				<div>
					<h2 className="text-lg font-semibold mb-2">From:</h2>
					<p className="text-gray-600">Your Company Name</p>
					<p className="text-gray-600">Your Address</p>
					<p className="text-gray-600">contact@yourcompany.com</p>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-2">Bill To:</h2>
					<p className="text-gray-600">{invoice.clientName}</p>
					<p className="text-gray-600">{invoice.clientAddress}</p>
					<p className="text-gray-600">{invoice.clientEmail}</p>
				</div>
			</div>

			<table className="min-w-full mb-8">
				<thead>
					<tr className="border-b">
						<th className="text-left py-3">Description</th>
						<th className="text-right py-3">Quantity</th>
						<th className="text-right py-3">Price</th>
						<th className="text-right py-3">Total</th>
					</tr>
				</thead>
				<tbody>
					{invoice.items.map((item, index) => (
						<tr key={index} className="border-b">
							<td className="py-3">{item.description}</td>
							<td className="text-right py-3">{item.quantity}</td>
							<td className="text-right py-3">${item.price.toFixed(2)}</td>
							<td className="text-right py-3">
								${(item.quantity * item.price).toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="3" className="text-right py-3 font-semibold">
							Total:
						</td>
						<td className="text-right py-3 font-semibold">
							${calculateTotal().toFixed(2)}
						</td>
					</tr>
				</tfoot>
			</table>

			<div className="mb-8">
				<h2 className="text-lg font-semibold mb-2">Notes:</h2>
				<p className="text-gray-600">{invoice.notes}</p>
			</div>

			{invoice.status === 'pending' && (
				<div className="flex justify-end">
					<button
						onClick={handleMarkAsPaid}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
					>
						Mark as Paid
					</button>
				</div>
			)}
		</div>
	);
};

export default InvoiceView;