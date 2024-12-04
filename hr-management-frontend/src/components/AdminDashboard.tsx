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


interface DepartmentData {
  department: string;
  count: string;
}
const AdminDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({name: "", email: "", department: "", role: "employee", joining_date: "", salary: "",});
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [departmentCounts, setDepartmentCounts] = useState<DepartmentData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const [employeeResponse, departmentsResponse, totalResponse] =
        await Promise.all([
          axios.get("http://localhost:4000/api/employees", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}, }),
          axios.get("http://localhost:4000/api/analytics/employees-by-department",{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},}),
          axios.get("http://localhost:4000/api/analytics/total-employees", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,},}),]);
      setEmployees(employeeResponse.data);
      setDepartmentCounts(departmentsResponse.data);
      setTotalEmployees(totalResponse.data.total_employees);
      setLoading(false);
    } catch (error) {
      setError(`Error fetching employees and analytics data ${error}`);
      setLoading(false);
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Analytics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p className="text-3xl font-bold text-gray-800">{totalEmployees}</p>
        </div>
        {departmentCounts.map((department) => (
          <div
            key={department.department}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {department.department}
            </h3>
            <p className="text-3xl font-bold text-gray-800">{department.count}</p>
          </div>
        ))}
      </div>

      {/* Employee Form */}
      <form
        className="bg-white shadow-lg rounded-lg p-8 mb-8 w-full"
        onSubmit={editEmployee ? handleUpdateEmployee : handleAddEmployee}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {editEmployee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Department:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Role:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Joining Date:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Salary:
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
          type="submit"
        >
          {editEmployee ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Employee List</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Joining Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Salary</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border px-6 py-4 text-gray-800">{employee.name}</td>
                    <td className="border px-6 py-4 text-gray-800">{employee.email}</td>
                    <td className="border px-6 py-4 text-gray-800">{employee.department}</td>
                    <td className="border px-6 py-4 text-gray-800">{employee.role}</td>
                    <td className="border px-6 py-4 text-gray-800">{employee.joining_date}</td>
                    <td className="border px-6 py-4 text-gray-800">{employee.salary}</td>
                    <td className="border px-6 py-4">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-2 rounded-md mr-2 transition duration-300"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md transition duration-300"
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
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
