import { useState } from 'react';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
	const [invoices] = useState([
		// This would typically come from your backend
		{
			id: 1,
			clientName: 'John Doe',
			invoiceNumber: 'INV-001',
			amount: 1500,
			status: 'pending',
			date: '2024-01-20',
		},
		// Add more sample invoices as needed
	]);

	return (
		<div className="bg-white rounded-lg shadow-md">
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-6">Invoices</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Invoice Number
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Client
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{invoices.map((invoice) => (
								<tr key={invoice.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.invoiceNumber}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.clientName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										${invoice.amount}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											invoice.status === 'paid'
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'
										}`}>
											{invoice.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<Link
											to={`/invoice/${invoice.id}`}
											className="text-blue-600 hover:text-blue-900 mr-4"
										>
											View
										</Link>
										{invoice.status === 'pending' && (
											<Link
												to={`/receipt/${invoice.id}`}
												className="text-green-600 hover:text-green-900"
											>
												Receipt
											</Link>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default InvoiceList;