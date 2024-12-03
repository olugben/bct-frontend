// useDepartmentCounts.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface DepartmentData {
  department: string;
  count: string;
}

export const useDepartmentCounts = () => {
  const [departmentCounts, setDepartmentCounts] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/analytics/employees-by-department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDepartmentCounts(response.data);
      } catch (err) {
        setError(`Error fetching department counts ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentCounts();
  }, []);

  return { departmentCounts, loading, error };
};
