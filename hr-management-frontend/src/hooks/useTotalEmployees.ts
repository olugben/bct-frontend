// useTotalEmployees.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useTotalEmployees = () => {
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/analytics/total-employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTotalEmployees(response.data.total_employees);
      } catch (err) {
        setError(`Error fetching total employees ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEmployees();
  }, []);

  return { totalEmployees, loading, error };
};
