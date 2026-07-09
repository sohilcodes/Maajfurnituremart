import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-lg gradient-gold flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
        {trend && (
          <span className="text-xs text-green-400 font-medium">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-heading font-bold text-white">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
