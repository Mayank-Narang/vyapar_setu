import React, { useState, useEffect } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    gstNumber: "",
    panNumber: "",
    contactPerson: "",
    contactPhone: "",
    companyAddress: "",
    companyDescription: "",
    companyLogo: "",
    gstCertificate: null,
    panCard: null,
    otherDocuments: null,
  });
  
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load companies from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("registrations") || "[]");
    setRegistrations(saved);
  }, []);

  // Save to localStorage when registrations update
  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const required = [
      "companyName",
      "industry",
      "gstNumber",
      "panNumber",
      "contactPerson",
      "contactPhone",
      "companyAddress",
      "companyDescription",
    ];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    setRegistrations([newEntry, ...registrations]);
    setFormData({
      companyName: "",
      industry: "",
      gstNumber: "",
      panNumber: "",
      contactPerson: "",
      contactPhone: "",
      companyAddress: "",
      companyDescription: "",
      companyLogo: "",
      gstCertificate: null,
      panCard: null,
      otherDocuments: null,
    });
    setShowModal(true);
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-2">
            <span className="text-orange-500 mr-2">⭐</span>
            Register Your MSME
          </h1>
          <p className="text-gray-500 text-sm">
            Join the Vyapar Saurabhyamshakti by registering your business.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        
        {/* Benefits */}
        <section className="bg-orange-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-gray-800 font-semibold text-base mb-4">Benefits of Registration</h2>
          <div className="grid gap-3">
            {[
              "Create marketplace listing",
              "Connect with verified MSMEs",
              "Build your business reputation",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">✓</div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <form
          className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold text-yellow-500 mb-6">Company Information</h2>
          
          {/* Input Fields */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">Company Name*</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">Industry*</label>
              <select name="industry" value={formData.industry} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="">Select Industry</option>
                {["Manufacturing","Services","Trading","Technology","Agriculture","Textiles","Food Processing","Other"].map((ind) => (
                  <option key={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          {/* GST & PAN */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">GST Number*</label>
              <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">PAN Number*</label>
              <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">Contact Person*</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-500 mb-1">Contact Phone*</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-yellow-500 mb-1">Company Address*</label>
            <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-yellow-500 mb-1">Company Description*</label>
            <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>

          {/* Logo */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
            <input type="url" name="companyLogo" value={formData.companyLogo} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>

          {/* File Upload */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              { name: "gstCertificate", label: "GST Certificate", icon: "📄" },
              { name: "panCard", label: "PAN Card", icon: "🆔" },
              { name: "otherDocuments", label: "Other Documents", icon: "📋" }
            ].map(file => (
              <div key={file.name} className="text-center">
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition">
                  <span className="block text-gray-400 text-2xl mb-2">{file.icon}</span>
                  <span className="block text-gray-600 text-xs font-medium mb-2">{file.label}</span>
                  <input type="file" name={file.name} onChange={handleChange} className="hidden" />
                  <span className="bg-orange-500 text-white px-3 py-1 text-xs rounded">📁 Upload File</span>
                </label>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md w-full">
              Register MSME
            </button>
          </div>
        </form>

        {/* Recently Registered */}
        <section className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Registered Companies</h2>
          {registrations.length === 0 ? (
            <p className="text-center text-gray-500">No companies registered yet.</p>
          ) : (
            registrations.slice(0, 5).map(c => (
              <div key={c.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{c.companyName}</h4>
                    <p className="text-sm text-gray-600">{c.industry}</p>
                    <p className="text-xs text-gray-500">Contact: {c.contactPerson}</p>
                    <p className="text-xs text-gray-500">
                      Registered: {new Date(c.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {c.companyLogo ? (
                    <img src={c.companyLogo} alt="Logo" className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs">Logo</div>
                  )}
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full inline-block mt-2">✓ Registered</span>
              </div>
            ))
          )}
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
              ✓
            </div>
            <h3 className="font-semibold mb-3">Registration Successful!</h3>
            <p className="text-sm text-gray-500 mb-4">Your MSME registration has been submitted successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
