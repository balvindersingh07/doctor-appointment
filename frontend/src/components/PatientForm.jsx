import React, { useState } from "react";

export default function PatientForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [errors, setErrors] = useState({});

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    let errs = {};
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.phone) errs.phone = "Phone is required";
    if (!form.email) errs.email = "Email is required";
    return errs;
  }

  function submit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // TODO: call backend API to save patient profile
    alert("✅ Patient details saved (demo)");

    // reset form
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
    });
    setErrors({});
  }

  const Input = ({ label, name, type = "text", ...props }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
          errors[name]
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-200 focus:ring-primary"
        }`}
        value={form[name]}
        onChange={(e) => update(name, e.target.value)}
        {...props}
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary">
        Patient Details
      </h3>
      <form onSubmit={submit} className="space-y-5">
        <div className="grid md:grid-cols-3 gap-4">
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
          <Input label="Phone" name="phone" type="tel" />
          <Input label="Email" name="email" type="email" />
          <Input label="Address Line 1" name="address1" />
          <Input label="Address Line 2" name="address2" />
          <Input label="City" name="city" />
          <Input label="State" name="state" />
          <Input label="Zipcode" name="zipcode" />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary hover:bg-primaryDark text-white rounded-full font-semibold transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
