import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  joining_date: string;
  salary: number;
}

const AdminDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee",
    joining_date: "",
    salary: "",
  });
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/employees", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employees",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmployees([...employees, response.data]);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      joining_date: employee.joining_date,
      salary: employee.salary.toString(),
    });
  };

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editEmployee) {
        const response = await axios.put(
          `http://localhost:4000/api/employees/${editEmployee.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployees(
          employees.map((emp) =>
            emp.id === editEmployee.id ? response.data : emp
          )
        );
        setEditEmployee(null);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <form
        className="bg-white shadow-md rounded-lg p-8 mb-8"
        onSubmit={editEmployee ? handleUpdateEmployee : handleAddEmployee}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Joining Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Salary:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          type="submit"
        >
          {editEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-6 text-center">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Joining Date</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">{employee.department}</td>
                <td className="border px-4 py-2">{employee.role}</td>
                <td className="border px-4 py-2">{employee.joining_date}</td>
                <td className="border px-4 py-2">{employee.salary}</td>
                <td className="border px-4 py-2 flex justify-around">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;








































// import React from "react";
// import { useEmployees } from "../hooks/useEmployees";
// import { useDepartmentCounts } from "../hooks/useDepartmentCounts";
// import { useTotalEmployees} from "../hooks/useTotalEmployees"; ;
// import EmployeeForm from "./EmployeeForm";
// import EmployeeTable from "./EmployeeTable";
// import AnalyticsCard from "./AnalyticsCard";

// const AdminDashboard: React.FC = () => {
//   const { employees, loading: employeesLoading, error: employeesError } = useEmployees();
//   const { departmentCounts, loading: departmentsLoading, error: departmentsError } = useDepartmentCounts();
//   const { totalEmployees, loading: totalLoading, error: totalError } = useTotalEmployees();

//   if (employeesLoading || departmentsLoading || totalLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

//       {/* Form to Add or Edit Employee */}
//       <EmployeeForm />

//       {/* Display Errors */}
//       {(employeesError || departmentsError || totalError) && (
//         <p className="text-red-500 text-center font-semibold mb-4">{employeesError || departmentsError || totalError}</p>
//       )}

//       {/* Analytics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <AnalyticsCard title="Total Employees" value={totalEmployees} />
//         <AnalyticsCard title="Department Breakdown" value={departmentCounts} />
//       </div>

//       {/* Employee List */}
//       <EmployeeTable employees={employees} />
//     </div>
//   );
// };

// export default AdminDashboard;
