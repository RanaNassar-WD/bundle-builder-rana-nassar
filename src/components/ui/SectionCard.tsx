import { Card } from "antd";
import { SectionCardProps } from "@/types/builder";

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold text-textBlack mb-4">{title}</h2>
      {children}
    </Card>
  );
}
