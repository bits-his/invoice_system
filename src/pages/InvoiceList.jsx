import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { _put, getapi } from "@/lib/Helper";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getinvoices = () => {
    setIsLoading(true);
    getapi(
      "api/getallinvoices",
      (response) => {
        setInvoices(response.invoices);
        setFilteredInvoice(response.invoices); // Initialize filtered list
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    getinvoices();
  }, []);

  // Filter invoices when searchQuery changes
  useEffect(() => {
    const filtered = invoices.filter(
      (invoice) =>
        invoice.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.invoice_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.invoice_date.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInvoice(filtered);
  }, [searchQuery, invoices]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading invoice details...</div>;
  }

  const updatestatus = (invoice_id) => {
    _put(
      `api/update_inv_status`,
      {
        status: "paid",
        user_id: invoice_id,
      },
      (resp) => (toast.success("Invoice paid successfully"), getinvoices()),
      (err) => (toast.error("Failed to update invoice status"), getinvoices())
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Invoices</h2>
          <div className="relative w-[400px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or invoice number"
              className="pl-8 border rounded-md p-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {/* {JSON.stringify(invoices[0].invoice_id)} */}
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
                  Amount(₦)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoice.map((invoice) => (
                <tr key={invoice.invoice_id}>
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
                    {invoice.invoice_date.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/invoice/${invoice.invoice_id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    {invoice.status === "paid" && (
                      <Link
                        to={`/receipt/${invoice.invoice_id}`}
                        className="text-green-600 hover:text-green-900 mr"
                      >
                        <Button variant="outline" className="w-20 ">
                          Receipt
                        </Button>
                      </Link>
                    )}
                    {invoice.status !== "paid" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-20 text-blue-600 hover:text-blue-900"
                            // onClick={() => updatestatus(invoice.invoice_id)}
                          >
                            Pay
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              Payment Confirmation
                            </DialogTitle>
                            <DialogDescription className="text-center">
                              Are you sure you want to paid this selected
                              invoice
                            </DialogDescription>
                          </DialogHeader>
                          <Table>
                            <TableRow>
                              <TableCell>
                                <strong>Invoice Number:</strong>{" "}
                              </TableCell>
                              <TableCell> {invoice.invoice_number}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Client Name:</strong>
                              </TableCell>
                              <TableCell>{invoice.client_name}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Amount:</strong>
                              </TableCell>
                              <TableCell> ₦{invoice.amount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Date:</strong>{" "}
                              </TableCell>
                              <TableCell>
                                {invoice.invoice_date.slice(0, 10)}
                              </TableCell>
                            </TableRow>
                          </Table>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => updatestatus(invoice.invoice_id)}
                            >
                              Pay
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </td>
                </tr>
              ))}
              {filteredInvoice.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
