import React, { useState } from "react";

const EmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee",
    joining_date: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Fields */}
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        {/* Other form fields */}
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
