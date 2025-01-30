import { getapi } from '@/lib/Helper';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InvoiceList = () => {

	const [invoices, setInvoices] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getinvoices = () => {
		setIsLoading(true)
		getapi(
			'api/getallinvoices',
            (response) => {
                setInvoices(response.invoices)
                setIsLoading(false)
            },
            (error) => {
                console.error(error)
                setIsLoading(false)
            }
		)
	}

	useEffect(() => (
		getinvoices()
	),[])

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
									Amount(&#8358;)
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
						{/* {JSON.stringify(invoices[0])} */}
						<tbody className="bg-white divide-y divide-gray-200">
							{invoices.map((invoice) => (
								<tr key={invoice.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.invoice_number}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.client_name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{invoice.amount}
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
										{invoice.invoice_date}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<Link
											to={`/invoice/${invoice.invoice_id}`}
											className="text-blue-600 hover:text-blue-900 mr-4"
										>
											View
										</Link>
										{invoice.status === 'pending' && (
											<Link
												to={`/receipt/${invoice}`}
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