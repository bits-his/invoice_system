import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		clientName: '',
		clientEmail: '',
		clientAddress: '',
		invoiceNumber: `INV-${Date.now()}`,
		invoiceDate: new Date().toISOString().split('T')[0],
		dueDate: '',
		items: [{ description: '', quantity: 1, price: 0 }],
		notes: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleItemChange = (index, field, value) => {
		const newItems = [...formData.items];
		newItems[index][field] = value;
		setFormData((prev) => ({
			...prev,
			items: newItems,
		}));
	};

	const addItem = () => {
		setFormData((prev) => ({
			...prev,
			items: [...prev.items, { description: '', quantity: 1, price: 0 }],
		}));
	};

	const removeItem = (index) => {
		setFormData((prev) => ({
			...prev,
			items: prev.items.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically save the invoice to your backend
		console.log(formData);
		navigate('/');
	};

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
			<h2 className="text-2xl font-bold mb-6">Create New Invoice</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Client Name</label>
						<input
							type="text"
							name="clientName"
							value={formData.clientName}
							onChange={handleInputChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Client Email</label>
						<input
							type="email"
							name="clientEmail"
							value={formData.clientEmail}
							onChange={handleInputChange}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							required
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Items</label>
					{formData.items.map((item, index) => (
						<div key={index} className="flex space-x-4 mt-2">
							<input
								type="text"
								placeholder="Description"
								value={item.description}
								onChange={(e) => handleItemChange(index, 'description', e.target.value)}
								className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							<input
								type="number"
								placeholder="Quantity"
								value={item.quantity}
								onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
								className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							<input
								type="number"
								placeholder="Price"
								value={item.price}
								onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
								className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							<button
								type="button"
								onClick={() => removeItem(index)}
								className="text-red-500 hover:text-red-700"
							>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={addItem}
						className="mt-2 text-blue-500 hover:text-blue-700"
					>
						+ Add Item
					</button>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Notes</label>
					<textarea
						name="notes"
						value={formData.notes}
						onChange={handleInputChange}
						rows="3"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					></textarea>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
					>
						Generate Invoice
					</button>
				</div>
			</form>
		</div>
	);
};

export default InvoiceForm;