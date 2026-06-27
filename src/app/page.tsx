'use client';
import CameraSelector from "@/components/builder/CameraSelector";
import ExtrasSelector from "@/components/builder/ExtrasSelector";
import PlanSelector from "@/components/builder/PlanSelector";
import SensorSelector from "@/components/builder/SensorSelector";
import SummaryPanel from "@/components/builder/SummaryPanel";
import { CameraOption, Plan, SensorOption } from "@/types/builder";
import { useState } from "react";

export default function Home() {
  const [selectedCameras, setSelectedCameras] = useState<
    { cam: CameraOption; quantity: number; color?: string, image?: string }[]
  >([]);
  const [selectedSensors, setSelectedSensors] = useState<
    { sensor: SensorOption; quantity: number; color?: string, image?: string }[]
  >([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [planSelectorExpanded, setPlanSelectorExpanded] = useState(false);
  const [sensorSelectorExpanded, setSensorSelectorExpanded] = useState(false);
  const [extrasSelectorExpanded, setExtrasSelectorExpanded] = useState(false);

  const handleUpdateQty = (camId: string, color: string | undefined, delta: number) => {
    setSelectedCameras((prev) =>
      prev.map((item) =>
        item.cam.id === camId && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  const handleSensorUpdateQty = (sensorId: string, color: string | undefined, delta: number) => {
    setSelectedSensors((prev) =>
      prev.map((item) =>
        item.sensor.id === sensorId && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <div className="p-6 px-15 ">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* LEFT SIDE – Steps (2/3) */}
        <div className="lg:col-span-2 space-y-0 gap-2">
          <div>  <CameraSelector onSelectionChange={setSelectedCameras} onNextClick={() => setPlanSelectorExpanded(true)} /></div>
          <div>   <PlanSelector onPlanSelect={setSelectedPlan} onNextClick={() => setSensorSelectorExpanded(true)} isExpanded={planSelectorExpanded} setIsExpanded={setPlanSelectorExpanded} /></div>
          <div>   <SensorSelector onSelectionChange={setSelectedSensors} onNextClick={() => setExtrasSelectorExpanded(true)} isExpanded={sensorSelectorExpanded} setIsExpanded={setSensorSelectorExpanded} /></div>
          <div>   <ExtrasSelector isExpanded={extrasSelectorExpanded} setIsExpanded={setExtrasSelectorExpanded} selectedCameras={selectedCameras} selectedSensors={selectedSensors} selectedPlan={selectedPlan} handleUpdateQty={handleUpdateQty} handleSensorUpdateQty={handleSensorUpdateQty} /></div>
        </div>

        {/* RIGHT SIDE – Summary (1/3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-4  ">
          <SummaryPanel selected={selectedCameras} selectedSensors={selectedSensors} selectedPlan={selectedPlan} onUpdateQty={handleUpdateQty} onSensorUpdateQty={handleSensorUpdateQty} />
        </div>

      </div>

    </div>
  );
}
