'use client';
import CameraSelector from "@/components/builder/CameraSelector";
import SummaryPanel from "@/components/builder/SummaryPanel";
import {CameraOption} from "@/types/builder";
import { useState } from "react";

export default function Home() {
   const [selectedCameras, setSelectedCameras] = useState<
    { cam: CameraOption; quantity: number; color?: string , image?: string }[]
  >([]);

  const handleUpdateQty = (camId: string, color: string | undefined, delta: number) => {
    setSelectedCameras((prev) =>
      prev.map((item) =>
        item.cam.id === camId && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  return (
    <div className="min-h-screen p-6 px-15 ">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE – Steps (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <CameraSelector  onSelectionChange={setSelectedCameras} />
          {/* Add more steps here */}
        </div>

        {/* RIGHT SIDE – Summary (1/3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-4  ">
          <SummaryPanel selected={selectedCameras} onUpdateQty={handleUpdateQty} />
        </div>

      </div>
    
    </div>
  );
}
