import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import brainstormlogo from "../assets/logo-brainstorm.png";
import { getapi } from "@/lib/Helper";
import { toWords } from "number-to-words";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import paid from "../assets/paid-watermark2.jpg";
import "./style.css";

const ReceiptView = () => {
  const { invoice_id } = useParams();
  //   const [receipt] = useState({
  //     // This would typically be fetched from your backend
  //     id: 1,
  //     receiptNumber: "RCP-001",
  //     invoiceNumber: "INV-001",
  //     clientName: "John Doe",
  //     amount: 1500,
  //     paymentDate: "2024-01-25",
  //     paymentMethod: "Credit Card",
  //   });
  const invoiceRef = useRef(null);
  const [receipt, setReceipt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!invoice_id) return;
    getapi(
      `api/getainvoicebyid?invoice_id=${invoice_id}`,
      (response) => {
        console.log("API Response:", response.response);
        setReceipt(response.response);
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
    return receipt
      .reduce((sum, item) => sum + Number(item.total || 0), 0)
      .toLocaleString();
  };

  const totalInWords = () => {
    const total = receipt.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );
    return toWords(total).replace(/\b\w/g, (char) => char.toUpperCase());
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
      pdf.save(`Receipt-${receipt[0]?.invoice_number || "unknown"}.pdf`);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div ref={invoiceRef} className="receipt-container">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="">
            <img src={brainstormlogo} className="w-[40%] " alt="logo" />
            {/* <h1 className="text-1xl m-0 p-0 text-gray-800">Brainstorm Systems</h1> */}
          </div>
          <div className="address">
            <h1 className="fs-5 font-bold underline text-gray-800">
              Office Address :{" "}
            </h1>
            <p className="text-gray-600">
              No 1st Floor, African Alliance House, F1, Sani Abacha Way, P.M.B.
              3103, Kano - Nigeria
            </p>
            <p className="text-gray-600">
              <b>Phone : </b> 09064240961, 08065284720, 
            </p>
            <p className="text-gray-600">
              <b>Date : </b>
              <span className="border-b border-gray-700">
                {receipt[0].invoice_date.slice(0, 10)}
              </span>
            </p>
            <p className="text-gray-600">
              <b>No.</b>
              {receipt[0].receipt_no}
            </p>
          </div>
        </div>

        <div className="border-gray-200 py-2 mb-3">
          <h1
            className="text-gray-700 text-center font-bold fs-2"
            style={{ textTransform: "uppercase", fontSize: "20px" }}
          >
            Payment Reciept
          </h1>
        </div>

        <div className="mb-6">
          <h2 className=" font-semibold mb-2 text-gray-600">
            Received From :
            <p className="border-b pb-2 fs-6 text-gray-400 text-center">
              {receipt[0].client_name}
            </p>
          </h2>
        </div>
        <div className="mb-6">
          <h2 className=" font-semibold mb-2 text-gray-600">
            The Sum Of :
            <p className="border-b pb-2 fs-6 text-gray-400 text-center">
              {totalInWords()} Naira Only
            </p>
          </h2>
        </div>
        <div className="mb-6">
          <h2 className=" font-semibold mb-2 text-gray-600">
            Being Payment For :
            <p className="border-b pb-2 fs-6 text-gray-400 text-center">
              {receipt.map((item) => item.description).join(", ")}
            </p>
          </h2>
        </div>

        <div className="mb-6 text-center">
          <div className="flex items-center justify-end">
            <p className=" border border-4 border-gray-800 p-2 w-[200px] rounded">
              <b>&#8358;</b> {calculateTotal()}
            </p>
          </div>
          <div className="flex items-center justify-center mt-5">
            <div className="pb-3">
              <p>__________________________________</p>
              <p>Authorized Sign</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-600">Thank you for your payment!</p>
        <button
          //   onClick={() => window.print()}
          onClick={handleDownloadPDF}
          type="button"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptView;
