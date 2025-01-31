import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getapi } from "@/lib/Helper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import brainstormlogo from "../assets/logo-brainstorm.png";

const InvoiceView = () => {
  const { invoice_id } = useParams();
  const invoiceRef = useRef(null);
  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!invoice_id) return;
    getapi(
      `api/getainvoicebyid?invoice_id=${invoice_id}`,
      (response) => {
        console.log("API Response:", response.response);
        setInvoice(response.response);
        // alert(invoice)
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching invoice:", error);
        setIsLoading(false);
      }
    );
  }, [invoice_id]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading invoice details...</div>;
  }

  const calculateTotal = () => {
    return invoice
      .reduce((sum, item) => sum + Number(item.total || 0), 0)
      .toLocaleString();
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    setTimeout(async () => {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Invoice-${invoice[0]?.invoice_number || "unknown"}.pdf`);
    }, 500); // Delay for 500ms
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div ref={invoiceRef} className="">
        {/* {JSON.stringify(invoice)} */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-8">
            <div className="text-right">
              <img src={brainstormlogo} className="w-[50%] h-50" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">{invoice[0].invoice_number}</p>
            </div>
          </div>

          <div className="grid mb-5">
            <div>
              <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
              <p className="text-gray-600">
                <b>Name:</b> {invoice[0].client_name}
              </p>
              <p className="text-gray-600">
                <b>Address:</b> {invoice[0].client_address}
              </p>
              <p className="text-gray-600">
                <b>Email:</b> {invoice[0].client_email}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Table className="min-w-full mb-8 border p-3 mt-8">
            <TableHeader className=" bg-gray-200">
              <TableRow className="border-b">
                <TableHead className="text-left py-3 border">
                  Description
                </TableHead>
                <TableHead className="text-right py-3 border">
                  Quantity
                </TableHead>
                <TableHead className="text-right py-3 border">Price</TableHead>
                <TableHead className="text-right py-3 border">Total</TableHead>
              </TableRow>
            </TableHeader>
            {invoice.map((items, index) => (
              <TableBody className="border">
                <TableRow key={index} className="border">
                  <TableCell className="py-3 border">
                    {items.description}
                  </TableCell>
                  <TableCell className="text-right py-3 border">
                    {items.quantity}
                  </TableCell>
                  <TableCell className="text-right py-3 border">
                    {items.price}
                  </TableCell>
                  <TableCell className="text-right py-3 border">
                    {items.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan="3"
                  className="text-right py-3 font-semibold"
                >
                  Total:
                </TableCell>
                <TableCell className="text-right py-3 font-semibold">
                  &#8358;{calculateTotal()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Notes:</h2>
          <p className="text-gray-600">{invoice[0].notes}</p>
			  </div>
			  <div className="text-left">
				  <h4 className="font-bold">Account Details : </h4>
				  <p><span className="font-semibold">Account Name : </span>{ invoice[0].account_name}</p>
				  <p><span className="font-semibold">Account Number : </span>{ invoice[0].account_number}</p>
				  <p><span className="font-semibold">Bank Name : </span>{ invoice[0].bank_name}</p>
			  </div>
      </div>
      {/* {invoice.status === "pending" && ( */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default InvoiceView;
