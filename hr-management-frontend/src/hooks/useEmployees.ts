// useEmployees.ts
import { useState, useEffect } from "react";
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

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        setError(`Error fetching employees ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
