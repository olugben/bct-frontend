import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: unknown;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {Array.isArray(value) ? (
        <ul>
          {value.map((item: { department: string; count: string }) => (
            <li key={item.department}>{item.department}: {item.count}</li>
          ))}
        </ul>
      ) : (
         <p>value</p>
      )}
    </div>
  );
};

export default AnalyticsCard;
