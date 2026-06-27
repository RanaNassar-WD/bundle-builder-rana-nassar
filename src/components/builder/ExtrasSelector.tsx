import { Collapse, CollapseProps } from 'antd';
import SummaryPanel from './SummaryPanel';
import { CameraOption, Plan, SensorOption } from '@/types/builder';

function ExtrasSelector({ isExpanded, setIsExpanded, selectedCameras, selectedSensors, selectedPlan, handleUpdateQty, handleSensorUpdateQty }: { isExpanded: boolean, setIsExpanded: (value: boolean) => void, selectedCameras: { cam: CameraOption; quantity: number; color?: string, image?: string }[], selectedSensors: { sensor: SensorOption; quantity: number; color?: string, image?: string }[], selectedPlan: Plan | null, handleUpdateQty: (camId: string, color: string | undefined, delta: number) => void, handleSensorUpdateQty: (sensorId: string, color: string | undefined, delta: number) => void }) {
  const collapseLabel = (
    <div className="flex flex-col gap-1 " >
      <span className="step-label">Step 3 of 4</span>
      <div className="h-px bg-steps mt-2" />
      <div className="flex items-center gap-2">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.2134 4.22826L9.7351 0.75L6.25684 4.22826" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.80739 7.92396C4.80739 8.32755 4.64707 8.71461 4.36168 8.99999C4.0763 9.28537 3.68924 9.4457 3.28565 9.4457H2.27174C1.86815 9.4457 1.48109 9.28537 1.19571 8.99999C0.910326 8.71461 0.75 8.32755 0.75 7.92396C0.75 7.52037 0.910326 7.13331 1.19571 6.84793C1.48109 6.56255 1.86815 6.40222 2.27174 6.40222H3.28565C3.68924 6.40222 4.0763 6.56255 4.36168 6.84793C4.64707 7.13331 4.80739 7.52037 4.80739 7.92396Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7639 7.92396C11.7639 8.32755 11.6036 8.71461 11.3182 8.99999C11.0328 9.28537 10.6458 9.4457 10.2422 9.4457H9.22828C8.82469 9.4457 8.43763 9.28537 8.15225 8.99999C7.86687 8.71461 7.70654 8.32755 7.70654 7.92396C7.70654 7.52037 7.86687 7.13331 8.15225 6.84793C8.43763 6.56255 8.82469 6.40222 9.22828 6.40222H10.2422C10.6458 6.40222 11.0328 6.56255 11.3182 6.84793C11.6036 7.13331 11.7639 7.52037 11.7639 7.92396Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.7205 7.92396C18.7205 8.32755 18.5602 8.71461 18.2748 8.99999C17.9894 9.28537 17.6023 9.4457 17.1987 9.4457H16.1848C15.7812 9.4457 15.3942 9.28537 15.1088 8.99999C14.8234 8.71461 14.6631 8.32755 14.6631 7.92396C14.6631 7.52037 14.8234 7.13331 15.1088 6.84793C15.3942 6.56255 15.7812 6.40222 16.1848 6.40222H17.1987C17.6023 6.40222 17.9894 6.56255 18.2748 6.84793C18.5602 7.13331 18.7205 7.52037 18.7205 7.92396Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.80739 13.5761C4.80739 13.9797 4.64707 14.3667 4.36168 14.6521C4.0763 14.9375 3.68924 15.0978 3.28565 15.0978H2.27174C1.86815 15.0978 1.48109 14.9375 1.19571 14.6521C0.910326 14.3667 0.75 13.9797 0.75 13.5761C0.75 13.1725 0.910326 12.7854 1.19571 12.5C1.48109 12.2146 1.86815 12.0543 2.27174 12.0543H3.28565C3.68924 12.0543 4.0763 12.2146 4.36168 12.5C4.64707 12.7854 4.80739 13.1725 4.80739 13.5761Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7639 13.5761C11.7639 13.9797 11.6036 14.3667 11.3182 14.6521C11.0328 14.9375 10.6458 15.0978 10.2422 15.0978H9.22828C8.82469 15.0978 8.43763 14.9375 8.15225 14.6521C7.86687 14.3667 7.70654 13.9797 7.70654 13.5761C7.70654 13.1725 7.86687 12.7854 8.15225 12.5C8.43763 12.2146 8.82469 12.0543 9.22828 12.0543H10.2422C10.6458 12.0543 11.0328 12.2146 11.3182 12.5C11.6036 12.7854 11.7639 13.1725 11.7639 13.5761Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.7205 13.5761C18.7205 13.9797 18.5602 14.3667 18.2748 14.6521C17.9894 14.9375 17.6023 15.0978 17.1987 15.0978H16.1848C15.7812 15.0978 15.3942 14.9375 15.1088 14.6521C14.8234 14.3667 14.6631 13.9797 14.6631 13.5761C14.6631 13.1725 14.8234 12.7854 15.1088 12.5C15.3942 12.2146 15.7812 12.0543 16.1848 12.0543H17.1987C17.6023 12.0543 17.9894 12.2146 18.2748 12.5C18.5602 12.7854 18.7205 13.1725 18.7205 13.5761Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.80739 19.2283C4.80739 19.6319 4.64707 20.0189 4.36168 20.3043C4.0763 20.5897 3.68924 20.75 3.28565 20.75H2.27174C1.86815 20.75 1.48109 20.5897 1.19571 20.3043C0.910326 20.0189 0.75 19.6319 0.75 19.2283C0.75 18.8247 0.910326 18.4376 1.19571 18.1523C1.48109 17.8669 1.86815 17.7065 2.27174 17.7065H3.28565C3.68924 17.7065 4.0763 17.8669 4.36168 18.1523C4.64707 18.4376 4.80739 18.8247 4.80739 19.2283Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7639 19.2283C11.7639 19.6319 11.6036 20.0189 11.3182 20.3043C11.0328 20.5897 10.6458 20.75 10.2422 20.75H9.22828C8.82469 20.75 8.43763 20.5897 8.15225 20.3043C7.86687 20.0189 7.70654 19.6319 7.70654 19.2283C7.70654 18.8247 7.86687 18.4376 8.15225 18.1523C8.43763 17.8669 8.82469 17.7065 9.22828 17.7065H10.2422C10.6458 17.7065 11.0328 17.8669 11.3182 18.1523C11.6036 18.4376 11.7639 18.8247 11.7639 19.2283Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.7205 19.2283C18.7205 19.6319 18.5602 20.0189 18.2748 20.3043C17.9894 20.5897 17.6023 20.75 17.1987 20.75H16.1848C15.7812 20.75 15.3942 20.5897 15.1088 20.3043C14.8234 20.0189 14.6631 19.6319 14.6631 19.2283C14.6631 18.8247 14.8234 18.4376 15.1088 18.1523C15.3942 17.8669 15.7812 17.7065 16.1848 17.7065H17.1987C17.6023 17.7065 17.9894 17.8669 18.2748 18.1523C18.5602 18.4376 18.7205 18.8247 18.7205 19.2283Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>



        <span className="cameras-title">Choose your Extras</span>
      </div>
    </div>
  );
  const items: CollapseProps["items"] = [
    {
      key: "extras",
      label: collapseLabel,
      children: (
        <div className="flex bg-lightPurple p-4 -m-4">
          <div className="w-1/2 ">
            <SummaryPanel selected={selectedCameras} selectedSensors={selectedSensors} selectedPlan={selectedPlan} onUpdateQty={handleUpdateQty} onSensorUpdateQty={handleSensorUpdateQty} />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className=" p-2 flex items-start gap-4">
              {/* Image */}
              <div className="w-[131px] h-[131px] shrink-0 rounded-lg overflow-hidden  flex items-center justify-center">
                <img
                  src="/assets/images/guarntee.png"
                  alt="guarantee"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">30-day hassle-free returns</h3>
                <p className="text-sm text-gray-600">
                  If you're not totally in love with the product, we will refund you 100%.
                </p>
              </div>
            </div>
            <div className=" savings flex justify-center items-center">
              Congrats! You’re saving $50.92 on your security bundle!
            </div>
            <div className="flex justify-center items-center w-full p-2">
              <button
                className="checkout-btn"
              >
                Checkout
              </button>

            </div>
            <div className="flex justify-center items-center w-full mt-0">
              <p className="underline font-Medium cursor-pointer"> <i> Save my system for later</i>
              </p>
            </div>
          </div>


        </div>
      ),
    }
  ]
  return (
    <Collapse
      className={`rounded-lg shadow ${isExpanded ? "bg-lightPurple" : ""}`}
      items={items}
      activeKey={isExpanded ? ["extras"] : []}
      // defaultActiveKey={["cameras"]}
      expandIconPlacement="end"
      style={isExpanded ? { backgroundColor: "var(--color-lightPurple)" } : {}}
      onChange={(keys) => setIsExpanded(Array.isArray(keys) ? keys.includes("extras") : keys === "extras")}
      expandIcon={({ isActive }) => (
        <svg

          className={`transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    />
  );
}

export default ExtrasSelector