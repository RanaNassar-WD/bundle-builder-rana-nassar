import CameraSelector from "@/components/builder/CameraSelector";
import SummaryPanel from "@/components/builder/SummaryPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-lightPurple p-6 ">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE – Steps (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <CameraSelector />
          {/* Add more steps here */}
        </div>

        {/* RIGHT SIDE – Summary (1/3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-4">
          <SummaryPanel />
        </div>

      </div>
    
    </div>
  );
}
