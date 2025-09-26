import React, { useState } from "react";
import './test.css';


function validateCardNumber(number) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function Test() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, cardNumber, expiry, cvv } = form;

    if (!name || !email || !phone || !cardNumber || !expiry || !cvv) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber) || !validateCardNumber(cardNumber)) {
      alert("Invalid Card Number");
      return;
    }

    const [month, year] = expiry.split("/").map(Number);
    const current = new Date();
    const expiryDate = new Date(`20${year}`, month - 1);
    if (!month || !year || month < 1 || month > 12 || expiryDate <= current) {
      alert("Invalid Expiry Date");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be 3 digits");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="checkout-wrapper">
      <div className="card checkout-card shadow-lg p-4">
        <h3 className="text-center mb-4">Checkout Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control rounded-pill"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control rounded-pill"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit phone"
              maxLength={10}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              className="form-control rounded-pill"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Expiry (MM/YY)</label>
              <input
                className="form-control rounded-pill"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="col">
              <label className="form-label">CVV</label>
              <input
                className="form-control rounded-pill"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gradient w-100 rounded-pill mt-3">
            Submit Payment
          </button>
        </form>

        {submitted && (
          <div className="order-summary mt-4 p-3 rounded shadow-sm">
            <h5 className="text-center mb-3">Order Summary</h5>
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Phone:</strong> {form.phone}</p>
            <p><strong>Card:</strong> **** **** **** {form.cardNumber.slice(-4)}</p>
            <p><strong>Expiry:</strong> {form.expiry}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;