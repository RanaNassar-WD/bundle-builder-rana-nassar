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
    icon: (
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_74_21711)">
          <path d="M1.34153 3.55188C1.34153 3.55188 0 3.79008 0 4.89639V12.9582C0 17.267 6.47248 22.0628 8.66916 23.492C9.10743 23.7778 9.67397 23.7778 10.1122 23.492C12.3143 22.0681 18.7814 17.2723 18.7814 12.9582V4.89639C18.7814 3.79008 17.4399 3.55188 17.4399 3.55188L10.1871 1.31808C9.66863 1.15927 9.11277 1.15927 8.59434 1.31808L1.34153 3.55188Z" fill="#E7EFFD" />
          <path d="M2.97186 2.60961C2.97186 2.60961 3.01461 2.59902 3.04134 2.59373L10.2941 0.359929C10.7003 0.232888 11.1386 0.232888 11.5448 0.359929L18.7976 2.59373C18.7976 2.59373 18.8404 2.60432 18.8671 2.60961C18.8671 2.60961 18.8778 2.60961 18.8938 2.6149C18.9205 2.6202 18.958 2.63078 19.0061 2.64666C19.1023 2.67842 19.2252 2.72606 19.3481 2.79488C19.5833 2.93251 19.7383 3.11248 19.7383 3.38774V11.4495C19.7383 12.3865 19.3855 13.3922 18.7709 14.4244C18.1616 15.4513 17.3171 16.4624 16.3925 17.3993C14.5379 19.2784 12.4053 20.8082 11.331 21.5016C11.0852 21.6604 10.7698 21.6604 10.524 21.5016C9.44433 20.8029 7.31713 19.2731 5.4625 17.394C4.53786 16.4571 3.6934 15.446 3.0841 14.4191C2.4748 13.3922 2.1167 12.3865 2.1167 11.4442V3.38774C2.1167 3.11248 2.26635 2.93251 2.50686 2.79488C2.62445 2.72606 2.74738 2.67842 2.84893 2.64666C2.89703 2.63078 2.93444 2.6202 2.96117 2.6149C2.97186 2.6149 2.98255 2.6149 2.98789 2.60961H2.97186Z" stroke="#0046C7" strokeWidth="0.5" />
          <path d="M6.26391 8.30005H5.72409L6.26391 9.55987L5.78823 10.6503L4.77273 8.30005H4.23291L5.62254 11.5396H5.95926L6.53649 10.2057L7.11372 11.5396H7.45044L8.84007 8.30005H8.30025L7.28475 10.6715L6.26925 8.30005H6.26391Z" fill="#0046C7" />
          <path d="M11.4055 8.30005L10.4755 9.93041L9.54549 8.30005H8.96826L10.2403 10.5074V11.5237H10.732V10.5074L11.9827 8.30005H11.4055Z" fill="#0046C7" />
          <path d="M15.0132 11.5396H17.584V10.9838H15.0132V11.5396Z" fill="#0046C7" />
          <path d="M15.0132 8.85585H17.584V8.30005H15.0132V8.85585Z" fill="#0046C7" />
          <path d="M15.0132 10.1898H17.584V9.63403H15.0132V10.1898Z" fill="#0046C7" />
          <path d="M12.1323 8.30005V8.83997H13.8266L11.9292 11.5449H14.6871V11.0103H12.9447L14.8581 8.30534H12.1323V8.30005Z" fill="#0046C7" />
        </g>
        <defs>
          <clipPath id="clip0_74_21711">
            <rect width="20" height="23.7037" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    shippingIcon: (
      <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="41" height="41" rx="5" fill="white" />
        <path d="M9.625 20.4043H20.5V22.2168H9.625V20.4043ZM7.8125 15.873H16.875V17.6855H7.8125V15.873Z" fill="#0AA288" />
        <path d="M33.114 20.9535L30.3953 14.6097C30.3254 14.4468 30.2092 14.3078 30.0612 14.2102C29.9132 14.1126 29.7397 14.0606 29.5624 14.0605H26.8437V12.248C26.8437 12.0077 26.7482 11.7772 26.5782 11.6072C26.4083 11.4373 26.1778 11.3418 25.9374 11.3418H11.4374V13.1543H25.0312V24.5332C24.6185 24.7733 24.2573 25.0925 23.9683 25.4726C23.6793 25.8527 23.4683 26.2862 23.3473 26.748H17.6525C17.4319 25.8938 16.9073 25.1493 16.1771 24.6541C15.4469 24.1589 14.5611 23.947 13.6858 24.0582C12.8105 24.1694 12.0059 24.5959 11.4226 25.258C10.8394 25.92 10.5176 26.772 10.5176 27.6543C10.5176 28.5366 10.8394 29.3886 11.4226 30.0506C12.0059 30.7127 12.8105 31.1392 13.6858 31.2504C14.5611 31.3616 15.4469 31.1497 16.1771 30.6545C16.9073 30.1593 17.4319 29.4148 17.6525 28.5605H23.3473C23.5445 29.3383 23.9953 30.0282 24.6286 30.5209C25.2618 31.0137 26.0413 31.2812 26.8437 31.2812C27.646 31.2812 28.4255 31.0137 29.0587 30.5209C29.692 30.0282 30.1428 29.3383 30.34 28.5605H32.2812C32.5215 28.5605 32.752 28.4651 32.922 28.2951C33.0919 28.1252 33.1874 27.8946 33.1874 27.6543V21.3105C33.1874 21.1878 33.1624 21.0663 33.114 20.9535ZM14.1562 29.4668C13.7977 29.4668 13.4473 29.3605 13.1492 29.1613C12.8511 28.9622 12.6188 28.6791 12.4816 28.3479C12.3444 28.0167 12.3085 27.6523 12.3785 27.3007C12.4484 26.9491 12.621 26.6262 12.8745 26.3727C13.128 26.1192 13.451 25.9466 13.8026 25.8766C14.1541 25.8067 14.5186 25.8426 14.8498 25.9798C15.181 26.117 15.464 26.3493 15.6632 26.6473C15.8624 26.9454 15.9687 27.2958 15.9687 27.6543C15.9687 28.135 15.7777 28.596 15.4378 28.9359C15.0979 29.2758 14.6369 29.4668 14.1562 29.4668ZM26.8437 15.873H28.9643L30.9073 20.4043H26.8437V15.873ZM26.8437 29.4668C26.4852 29.4668 26.1348 29.3605 25.8367 29.1613C25.5386 28.9622 25.3063 28.6791 25.1691 28.3479C25.0319 28.0167 24.996 27.6523 25.066 27.3007C25.1359 26.9491 25.3085 26.6262 25.562 26.3727C25.8155 26.1192 26.1385 25.9466 26.4901 25.8766C26.8416 25.8067 27.2061 25.8426 27.5373 25.9798C27.8685 26.117 28.1515 26.3493 28.3506 26.6473C28.5498 26.9454 28.6562 27.2958 28.6562 27.6543C28.6562 28.135 28.4651 28.596 28.1252 28.9359C27.7853 29.2758 27.3244 29.4668 26.8437 29.4668Z" fill="#0AA288" />
      </svg>
    ),
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

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.selectedCameras) setSelectedCameras(parsed.selectedCameras);
        if (parsed.selectedSensors) setSelectedSensors(parsed.selectedSensors);
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
          <div>  <CameraSelector onSelectionChange={setSelectedCameras} onNextClick={() => setPlanSelectorExpanded(true)} /></div>
          <div>   <PlanSelector onPlanSelect={setSelectedPlan} onNextClick={() => setSensorSelectorExpanded(true)} isExpanded={planSelectorExpanded} setIsExpanded={setPlanSelectorExpanded} /></div>
          <div>   <SensorSelector onSelectionChange={setSelectedSensors} onNextClick={() => setExtrasSelectorExpanded(true)} isExpanded={sensorSelectorExpanded} setIsExpanded={setSensorSelectorExpanded} /></div>
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
