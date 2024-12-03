import React from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  joining_date: string;
  salary: number;
}

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Joining Date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>{employee.role}</td>
            <td>{employee.joining_date}</td>
            <td>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
