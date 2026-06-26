import { CameraOption } from "@/types/builder";
import { Card, Divider } from "antd";

export default function SummaryPanel({ selected,onUpdateQty }: {  selected: { cam: CameraOption; quantity: number; color?: string; image?: string  }[];
  onUpdateQty: (camId: string, color: string | undefined, delta: number) => void; }) {
 const total = selected.reduce(
    (sum, { cam, quantity }) =>
      sum + (cam.priceAfter ?? cam.priceBefore) * quantity,
    0
  );
  return (
    <Card className="shadow-lg"  style={{ backgroundColor: "var(--color-lightPurple)" }}>
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
                      {cam.priceAfter ? (<><span className="review-price-before">${cam.priceBefore.toFixed(2)}</span>  <span className="review-price-after">${cam.priceAfter.toFixed(2)}</span> </>): (<span className="review-price-after">${cam.priceBefore.toFixed(2)}</span>)}
                   
                    </div>
            </div>
          ))}
        </div>

        <Divider />
        <div className="pt-4">
          <p className="text-lg font-bold text-purple">Total: ${total.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
}
