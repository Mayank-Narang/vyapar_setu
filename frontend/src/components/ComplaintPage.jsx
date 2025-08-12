import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";

export function ComplaintPage() {
  const { fontSize } = useApp();

  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    partyAgainst: "",
    complaintSubject: "",
    detailedDescription: "",
    contractDocuments: null, // File
  });

  const [complaints, setComplaints] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(saved);
  }, []);

  // Save to localStorage when complaints update
  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((s) => ({ ...s, [name]: files[0] || null }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const required = [
      "yourName",
      "yourEmail",
      "partyAgainst",
      "complaintSubject",
      "detailedDescription",
    ];
    for (const field of required) {
      if (!formData[field]?.trim()) {
        alert(`Please fill ${field}`);
        return;
      }
    }

    if (!/\S+@\S+\.\S+/.test(formData.yourEmail)) {
      alert("Please enter a valid email");
      return;
    }

    const entry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      contractDocuments:
        formData.contractDocuments && formData.contractDocuments.name
          ? {
              name: formData.contractDocuments.name,
              size: formData.contractDocuments.size,
              type: formData.contractDocuments.type,
            }
          : null,
    };

    setComplaints((prev) => [entry, ...prev]);

    setFormData({
      yourName: "",
      yourEmail: "",
      partyAgainst: "",
      complaintSubject: "",
      detailedDescription: "",
      contractDocuments: null,
    });

    setShowSuccess(true);
  };

  return (
    <div
      className="bg-gray-50 font-sans min-h-screen"
      style={{ fontSize: `${fontSize}px` }} // ✅ global font size applied
    >
      {/* Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <h1
            className="font-bold text-gray-800 flex items-center justify-center mb-2"
            style={{ fontSize: `${fontSize + 8}px` }}
          >
            <span className="text-orange-500 mr-2">⚠️</span>
            Raise a Complaint
          </h1>
          <p
            className="text-gray-500"
            style={{ fontSize: `${fontSize - 2}px` }}
          >
            Submit your complaint with relevant details and contract documents.
            Our team will review and facilitate resolution.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6">
        {/* Important Notice */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div style={{ fontSize: `${fontSize + 4}px` }}>⚠️</div>
            <div>
              <h2
                className="font-semibold text-gray-800 mb-1"
                style={{ fontSize: `${fontSize}px` }}
              >
                Important Notice
              </h2>
              <p
                className="text-gray-700"
                style={{ fontSize: `${fontSize - 2}px` }}
              >
                This platform facilitates complaint submission and communication.
                For legal disputes, we will help escalate to relevant legal or
                government authorities. Please provide accurate information and
                supporting documents.
              </p>
            </div>
          </div>
        </section>

        {/* Complaint Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6"
        >
          <h3
            className="font-semibold text-gray-800 mb-4"
            style={{ fontSize: `${fontSize + 2}px` }}
          >
            Complaint Details
          </h3>

          {/* Name / Email */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                className="block font-medium text-gray-700 mb-1"
                style={{ fontSize: `${fontSize}px` }}
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                style={{ fontSize: `${fontSize}px` }}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                className="block font-medium text-gray-700 mb-1"
                style={{ fontSize: `${fontSize}px` }}
              >
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                name="yourEmail"
                value={formData.yourEmail}
                onChange={handleChange}
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                style={{ fontSize: `${fontSize}px` }}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Party Against */}
          <div className="mb-5">
            <label
              className="block font-medium text-gray-700 mb-1"
              style={{ fontSize: `${fontSize}px` }}
            >
              Party Against (Company/Individual Name){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              name="partyAgainst"
              value={formData.partyAgainst}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              style={{ fontSize: `${fontSize}px` }}
              placeholder="Enter the name of the party"
            />
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label
              className="block font-medium text-gray-700 mb-1"
              style={{ fontSize: `${fontSize}px` }}
            >
              Complaint Subject <span className="text-red-500">*</span>
            </label>
            <input
              name="complaintSubject"
              value={formData.complaintSubject}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              style={{ fontSize: `${fontSize}px` }}
              placeholder="Brief summary of your complaint"
            />
          </div>

          {/* Detailed Description */}
          <div className="mb-5">
            <label
              className="block font-medium text-gray-700 mb-1"
              style={{ fontSize: `${fontSize}px` }}
            >
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              style={{ fontSize: `${fontSize}px` }}
              placeholder="Provide detailed information..."
            />
          </div>

          {/* Contract Documents */}
          <div className="mb-6">
            <label
              className="block font-medium text-gray-700 mb-2"
              style={{ fontSize: `${fontSize}px` }}
            >
              Contract Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
              <div style={{ fontSize: `${fontSize + 10}px` }}>📤</div>
              <p
                className="text-gray-600 mb-3"
                style={{ fontSize: `${fontSize - 2}px` }}
              >
                Upload contracts, agreements, or supporting documents
              </p>
              <p
                className="text-gray-500 mb-3"
                style={{ fontSize: `${fontSize - 4}px` }}
              >
                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 500KB)
              </p>
              <label
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded cursor-pointer"
                style={{ fontSize: `${fontSize}px` }}
              >
                Choose File
                <input
                  type="file"
                  name="contractDocuments"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </label>
              {formData.contractDocuments?.name && (
                <div
                  className="mt-3 text-gray-700"
                  style={{ fontSize: `${fontSize - 2}px` }}
                >
                  Selected: {formData.contractDocuments.name}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-md w-full"
            style={{ fontSize: `${fontSize}px` }}
          >
            Submit Complaint
          </button>
        </form>

        {/* Recently Submitted Complaints */}
        <section className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-10">
          <h3
            className="font-semibold text-gray-800 mb-4"
            style={{ fontSize: `${fontSize + 2}px` }}
          >
            Recently Submitted Complaints
          </h3>
          {complaints.length === 0 ? (
            <p
              className="text-center text-gray-500"
              style={{ fontSize: `${fontSize}px` }}
            >
              No complaints submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4
                        className="font-semibold text-gray-800"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {c.complaintSubject}
                      </h4>
                      <p
                        className="text-gray-600 mb-1"
                        style={{ fontSize: `${fontSize - 2}px` }}
                      >
                        Against: {c.partyAgainst}
                      </p>
                      <p
                        className="text-gray-500"
                        style={{ fontSize: `${fontSize - 4}px` }}
                      >
                        By: {c.yourName} •{" "}
                        {new Date(c.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                      style={{ fontSize: `${fontSize - 4}px` }}
                    >
                      Submitted
                    </span>
                  </div>
                  {c.contractDocuments?.name && (
                    <p
                      className="text-gray-500 mt-2"
                      style={{ fontSize: `${fontSize - 4}px` }}
                    >
                      Attachment: {c.contractDocuments.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Help Section */}
        <section className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3
            className="font-semibold text-gray-800 mb-3"
            style={{ fontSize: `${fontSize + 2}px` }}
          >
            Need Help?
          </h3>
          <p
            className="text-gray-600 mb-4"
            style={{ fontSize: `${fontSize}px` }}
          >
            If assistance is needed with filing a complaint, reach out via:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p
                className="text-gray-700 font-medium mb-1"
                style={{ fontSize: `${fontSize}px` }}
              >
                Email Support
              </p>
              <p
                className="text-gray-500"
                style={{ fontSize: `${fontSize - 2}px` }}
              >
                complaints@vyaparsetu.com
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p
                className="text-gray-700 font-medium mb-1"
                style={{ fontSize: `${fontSize}px` }}
              >
                Phone Support
              </p>
              <p
                className="text-gray-500"
                style={{ fontSize: `${fontSize - 2}px` }}
              >
                +91-11-XXXX-XXXX (Mon–Fri, 9 AM – 6 PM)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <div
              className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
              style={{ fontSize: `${fontSize + 4}px` }}
            >
              ✓
            </div>
            <h3
              className="font-semibold mb-3"
              style={{ fontSize: `${fontSize + 2}px` }}
            >
              Complaint Submitted!
            </h3>
            <p
              className="text-gray-500 mb-4"
              style={{ fontSize: `${fontSize}px` }}
            >
              Your complaint has been submitted successfully. Our team will
              review and get back soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
              style={{ fontSize: `${fontSize}px` }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
