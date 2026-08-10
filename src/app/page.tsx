'use client';
import CameraSelector from "@/components/builder/CameraSelector";
import ExtrasSelector from "@/components/builder/ExtrasSelector";
import PlanSelector from "@/components/builder/PlanSelector";
import SensorSelector from "@/components/builder/SensorSelector";
import SummaryPanel from "@/components/builder/SummaryPanel";
import { CameraOption, Plan, SensorOption } from "@/types/builder";
import { useState, useEffect } from "react";
import { message } from "antd";

const STORAGE_KEY = 'bundle-builder-saved-system';

// Reconstruct plan with icons from saved data
const reconstructPlan = (savedPlan: any): Plan | null => {
  if (!savedPlan) return null;

  return {
    id: savedPlan.id,
    name: savedPlan.name,
    priceBefore: savedPlan.priceBefore,
    priceAfter: savedPlan.priceAfter,
    shippingText: savedPlan.shippingText,
    shippingPriceBefore: savedPlan.shippingPriceBefore,
    shippingPriceAfter: savedPlan.shippingPriceAfter,
  };
};

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

  // Store initial saved selections to pass to selectors
  const [savedCamerasInit, setSavedCamerasInit] = useState<{ cam: CameraOption; quantity: number; color?: string, image?: string }[] | undefined>(undefined);
  const [savedSensorsInit, setSavedSensorsInit] = useState<{ sensor: SensorOption; quantity: number; color?: string, image?: string }[] | undefined>(undefined);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.selectedCameras) {
          setSavedCamerasInit(parsed.selectedCameras);
        }
        if (parsed.selectedSensors) {
          setSavedSensorsInit(parsed.selectedSensors);
        }
        if (parsed.selectedPlan) {
          const fullPlan = reconstructPlan(parsed.selectedPlan);
          setSelectedPlan(fullPlan);
        }
      }
    } catch (error) {
      console.error('Error loading saved system:', error);
    }
  }, []);

  // Save current state to localStorage
  const handleSaveSystem = () => {
    try {
      // Filter out non-serializable properties (React components)
      const serializablePlan = selectedPlan ? {
        id: selectedPlan.id,
        name: selectedPlan.name,
        priceBefore: selectedPlan.priceBefore,
        priceAfter: selectedPlan.priceAfter,
        shippingText: selectedPlan.shippingText,
        shippingPriceBefore: selectedPlan.shippingPriceBefore,
        shippingPriceAfter: selectedPlan.shippingPriceAfter,
      } : null;

      const dataToSave = {
        selectedCameras,
        selectedSensors,
        selectedPlan: serializablePlan,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      message.success('Your system has been saved successfully!');
    } catch (error) {
      console.error('Error saving system:', error);
      message.error('Failed to save your system. Please try again.');
    }
  };

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
          <div>  <CameraSelector onSelectionChange={setSelectedCameras} onNextClick={() => setPlanSelectorExpanded(true)} initialSelections={savedCamerasInit} /></div>
          <div>   <PlanSelector onPlanSelect={setSelectedPlan} onNextClick={() => setSensorSelectorExpanded(true)} isExpanded={planSelectorExpanded} setIsExpanded={setPlanSelectorExpanded} /></div>
          <div>   <SensorSelector onSelectionChange={setSelectedSensors} onNextClick={() => setExtrasSelectorExpanded(true)} isExpanded={sensorSelectorExpanded} setIsExpanded={setSensorSelectorExpanded} initialSelections={savedSensorsInit} /></div>
          <div>   <ExtrasSelector isExpanded={extrasSelectorExpanded} setIsExpanded={setExtrasSelectorExpanded} selectedCameras={selectedCameras} selectedSensors={selectedSensors} selectedPlan={selectedPlan} handleUpdateQty={handleUpdateQty} handleSensorUpdateQty={handleSensorUpdateQty} /></div>
        </div>

        {/* RIGHT SIDE – Summary (1/3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-4  ">
          <SummaryPanel selected={selectedCameras} selectedSensors={selectedSensors} selectedPlan={selectedPlan} onUpdateQty={handleUpdateQty} onSensorUpdateQty={handleSensorUpdateQty} onSaveSystem={handleSaveSystem} />
        </div>

      </div>

    </div>
  );
}
