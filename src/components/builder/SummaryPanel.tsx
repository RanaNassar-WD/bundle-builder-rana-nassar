import { Card } from "antd";

export default function SummaryPanel() {
  return (
    <Card className="shadow-lg">
      <h2 className="text-xl font-bold text-textBlack mb-4">
        Your Security System
      </h2>

      <div className="space-y-3">
        <div>
          <p className="font-semibold">Cameras</p>
          <p className="text-sm">Wyze Cam v4 × 1 — $27.98</p>
          <p className="text-sm">Wyze Cam Pan v3 × 2 — $47.98</p>
        </div>

        <div>
          <p className="font-semibold">Sensors</p>
          <p className="text-sm">Motion Sensor × 2 — $59.98</p>
        </div>

        <div>
          <p className="font-semibold">Accessories</p>
          <p className="text-sm">MicroSD 256GB × 2 — $41.96</p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-lg font-bold text-purple">Total: $187.89</p>
        </div>
      </div>
    </Card>
  );
}
