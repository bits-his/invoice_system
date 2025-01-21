import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="bg-blue shadow-lg">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="text-xl font-bold text-gray-800">
						Invoice System
					</Link>
					<div className="flex space-x-4">
						<Link
							to="/"
							className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
						>
							Invoices
						</Link>
						<Link
							to="/create-invoice"
							className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
						>
							Create Invoice
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;