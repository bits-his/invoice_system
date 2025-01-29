import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const RegisterInvoiceForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [invoice, setInvoice] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    const generatedInvoice = {
      id: Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString(),
      details: formData,
    };

    setInvoice(generatedInvoice);
    setShowDialog(true);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
            <Button type="button" onClick={handleRegister} className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
          </DialogHeader>
          {invoice && (
            <div className="space-y-4">
              <p><strong>Invoice ID:</strong> {invoice.id}</p>
              <p><strong>Date:</strong> {invoice.date}</p>
              <p><strong>Name:</strong> {`${invoice.details.firstname} ${invoice.details.lastname}`}</p>
              <p><strong>Email:</strong> {invoice.details.email}</p>
              <p><strong>Username:</strong> {invoice.details.username}</p>
              <Button onClick={printReceipt} className="w-full">
                Print Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterInvoiceForm;
