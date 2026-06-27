import { CameraOption, Plan, SensorOption } from "@/types/builder";
import { Card, Divider } from "antd";

export default function SummaryPanel({ selected, selectedSensors, selectedPlan, onUpdateQty, onSensorUpdateQty, onSaveSystem }: {
  selected: { cam: CameraOption; quantity: number; color?: string; image?: string }[];
  selectedSensors: { sensor: SensorOption; quantity: number; color?: string; image?: string }[];
  selectedPlan: Plan | null;
  onUpdateQty: (camId: string, color: string | undefined, delta: number) => void;
  onSensorUpdateQty: (sensorId: string, color: string | undefined, delta: number) => void;
  onSaveSystem: () => void;
}) {
  // Calculate total before discount
  const totalBefore = selected.reduce(
    (sum, { cam, quantity }) =>
      sum + cam.priceBefore * quantity,
    0
  ) + selectedSensors.reduce(
    (sum, { sensor, quantity }) =>
      sum + sensor.priceBefore * quantity,
    0
  ) + (selectedPlan ?
    (parseFloat(selectedPlan.priceBefore.replace(/[$,]/g, '')) || 0) +
    (parseFloat(selectedPlan.shippingPriceBefore.replace(/[$,]/g, '')) || 0)
    : 0);

  // Calculate total after discount
  const total = selected.reduce(
    (sum, { cam, quantity }) =>
      sum + (cam.priceAfter ?? cam.priceBefore) * quantity,
    0
  ) + selectedSensors.reduce(
    (sum, { sensor, quantity }) =>
      sum + (sensor.priceAfter ?? sensor.priceBefore) * quantity,
    0
  ) + (selectedPlan ?
    (parseFloat(selectedPlan.priceAfter.replace(/[$,]/g, '')) || 0) +
    (parseFloat(selectedPlan.shippingPriceAfter.replace(/[$,]/g, '')) || 0)
    : 0);
  return (
    <Card className="shadow-lg" style={{ backgroundColor: "var(--color-lightPurple)" }}>
      <p className="step-label" >Review</p>
      <h2 className="cameras-title">
        Your Security System
      </h2>
      <p className="review-description">
        Review you personalized protection system designed to keep what matters most safe.
      </p>
      <Divider />
      <div className="space-y-3">
        <p className="review-regular-title">Cameras</p>
        <div className="space-y-4 ">
          {selected.map(({ cam, quantity, color, image }) => (
            <div
              key={`${cam.id}-${color}`}
              className="flex items-center justify-between gap-2  p-1 rounded-md"
            >
              {/* Image */}
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                {/* <img src={cam.image} alt={cam.name} className="w-full h-full object-cover" /> */}
                <img src={image} alt={`${cam.name} ${color}`} className="w-full h-full object-cover" />
              </div>

              {/* Name + Color */}


              <div className="review-text">
                {cam.name}
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => onUpdateQty(cam.id, color, -1)}
                  className="w-5 h-5 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium text-sm">{quantity}</span>
                <button
                  onClick={() => onUpdateQty(cam.id, color, 1)}
                  className="w-5 h-5 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Prices */}
              <div className="flex flex-col justify-center  gap-1">
                {cam.priceAfter ? (<><span className="review-price-before">${cam.priceBefore.toFixed(2)}</span>  <span className="review-price-after">${cam.priceAfter.toFixed(2)}</span> </>) : (<span className="review-price-after">${cam.priceBefore.toFixed(2)}</span>)}

              </div>
            </div>
          ))}
        </div>

        <Divider />
        {selectedSensors.length > 0 && (
          <>
            <p className="review-regular-title">Sensors</p>
            <div className="space-y-4 ">
              {selectedSensors.map(({ sensor, quantity, color, image }) => (
                <div
                  key={`${sensor.id}-${color}`}
                  className="flex items-center justify-between gap-2  p-1 rounded-md"
                >
                  {/* Image */}
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <img src={image} alt={`${sensor.name} ${color}`} className="w-full h-full object-cover" />
                  </div>

                  {/* Name + Color */}
                  <div className="review-text">
                    {sensor.name}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 ">
                    <button
                      onClick={() => onSensorUpdateQty(sensor.id, color, -1)}
                      className="w-5 h-5 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{quantity}</span>
                    <button
                      onClick={() => onSensorUpdateQty(sensor.id, color, 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Prices */}
                  <div className="flex flex-col justify-center  gap-1">
                    {sensor.priceAfter ? (<><span className="review-price-before">${sensor.priceBefore.toFixed(2)}</span>  <span className="review-price-after">${sensor.priceAfter.toFixed(2)}</span> </>) : (<span className="review-price-after">${sensor.priceBefore.toFixed(2)}</span>)}

                  </div>
                </div>
              ))}
            </div>
          </>
        )}


        {selectedPlan && (
          <>
            <Divider />
            <p className="review-regular-title">Plan</p>
            <div className="flex items-center justify-between gap-2 p-1 rounded-md">
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                {selectedPlan.icon}
              </div>

              {/* Name */}
              <div className="plan-selector-text w-2/3">
                Cam <span className="text-purple">Unlimited</span>
              </div>

              {/* Prices */}
              <div className="flex flex-col justify-center gap-1">
                <span className="review-price-before">{selectedPlan.priceBefore}</span>
                <span className="review-price-after">{selectedPlan.priceAfter}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-1 rounded-md">
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                {selectedPlan.shippingIcon}
              </div>

              {/* Name */}
              <div className="plan-selector-text w-2/3">
                {selectedPlan.shippingText}
              </div>

              {/* Prices */}
              <div className="flex flex-col justify-center gap-1">
                <span className="review-price-before">{selectedPlan.shippingPriceBefore}</span>
                <span className="review-price-after">{selectedPlan.shippingPriceAfter}</span>
              </div>
            </div>

          </>
        )}
        <div className="flex items-center justify-between gap-2 p-1 mt-2 rounded-md mt-4">

          <div className="w-[78px] h-[78px] flex items-center justify-center items-center flex-shrink-0">
            <img src="/assets/images/guarntee.png" alt="guarantee" className="w-full h-full object-cover" />
          </div>

          {/* Prices */}
          <div className="guarantee-container">
            <div className="guarantee-box">
              As low as 19.99/mo


            </div>
            <div className="flex justify-center items-center gap-2 ">
              <div className="total-before-price">${totalBefore.toFixed(2)}</div>
              <div className="total-price">${total.toFixed(2)}</div>
            </div>
          </div>


        </div>
        <div className=" savings flex justify-center items-center">
          Congrats! You're saving ${(totalBefore - total).toFixed(2)} on your security bundle!
        </div>
        <div className="flex justify-center items-center w-full p-2">
          <button
            className="checkout-btn"
          >
            Checkout
          </button>

        </div>
        <div className="flex justify-center items-center w-full mt-0">
          <p className="underline font-Medium cursor-pointer" onClick={onSaveSystem}> <i> Save my system for later</i>
          </p>
        </div>

        <div className="pt-4">

        </div>
      </div>
    </Card>
  );
}
