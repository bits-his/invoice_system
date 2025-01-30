import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postapi } from "@/lib/Helper";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: "",
    email: "",
    clientAddress: "",
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [],
    notes: "",
  });

  const [newItem, setNewItem] = useState({
    description: "",
    quantity: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (editingIndex !== null) {
      const updatedItems = [...formData.items];
      updatedItems[editingIndex] = newItem;
      setFormData((prev) => ({ ...prev, items: updatedItems }));
      setEditingIndex(null);
    } else {
      setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    }
    setNewItem({ description: "", quantity: 1, price: 0 });
  };

  const editItem = (index) => {
    setNewItem(formData.items[index]);
    setEditingIndex(index);
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	  console.log(formData);
	  const data = {...formData}
	  postapi(
		  `api/generatemyinvoice`,
		  data,
		  (res) => {
			  alert("Invoice has been successfully generated l");
            //   navigate(`/invoices/${res.data.invoice_id}`);
		  },
		  (err) => {
			  alert("Error generating invoice")
			  console.log(err);
		  }
	  )
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Client Name</Label>
            <Input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Client Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Client Address</Label>
            <Input
              type="text"
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
            />
          </div>
          <div className="">
            <Label>Quantity</Label>
            <Input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
            />
          </div>
          <div className="">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={newItem.price}
              onChange={handleNewItemChange}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white"
          >
            {editingIndex !== null ? "Update Item" : "Add Item"}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    onClick={() => editItem(index)}
                    className="bg-blue-500 text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => removeItem(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div>
          <Label>Notes</Label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            placeholder="Some notes if any"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 text-white">
            Generate Invoice
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
