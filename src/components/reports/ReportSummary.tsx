
import React from "react";

interface SummaryItem {
  label: string;
  value: string | number;
  colorClass?: string;
}

interface ReportSummaryProps {
  items: SummaryItem[];
}

export function ReportSummary({ items }: ReportSummaryProps) {
  return (
    <div className="mt-4 p-4 bg-muted rounded-md">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm font-medium">{item.label}</p>
            <p className={`text-2xl font-bold ${item.colorClass || ''}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
