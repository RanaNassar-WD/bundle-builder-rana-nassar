"use client";

import { useState } from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { CameraOption } from "@/types/builder";

const cameraOptions: CameraOption[] = [
  {
    id: "v4",
    name: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    priceBefore: 35.98,
    priceAfter: 27.98,
    discount: 22,
    image: "/assets/images/image1.png",
  },
  {
    id: "pan-v2",
    name: "Wyze Cam Pan v2",
    description: "360° pan and 180° tilt security camera.",
    priceBefore: 39.98,
    priceAfter: 34.98,
    discount: 12,
    image: "/assets/images/image2.png",
  },
  {
    id: "pan-v3",
    name: "Wyze Cam Floodlight v2",
    description: "2K Floodlight Camera with a 160° wide-angle view for your garage .",
    priceBefore: 89.98,
    priceAfter: 69.98,
    discount: 22,
    image: "/assets/images/image3.png",
  },
  {
    id: "pan-v4",
    name: "Wyze duo cam Doorbell",
    description: "Two cameras, Two views. Double the porch protection.",
    priceBefore: 69.98,
    image: "/assets/images/image4.png",
  },
  {
    id: "pan-v5",
    name: "Wyze Cam Pan v5",
    description: "360° pan and 180° tilt.",
    priceBefore: 89.98,
    image: "/assets/images/image5.png",
  },
];

type ColorOption = "white" | "black";

interface CameraState {
  color: ColorOption;
  quantity: number;
  selected: boolean;
}

export default function CameraSelector() {
  const [states, setStates] = useState<Record<number, CameraState>>(
    Object.fromEntries(
      cameraOptions.map((_, i) => [i, { color: "white", quantity: 1, selected: false }])
    )
  );

  const toggleSelect = (i: number) =>
    setStates((prev) => ({ ...prev, [i]: { ...prev[i], selected: !prev[i].selected } }));

  const setColor = (i: number, color: ColorOption) =>
    setStates((prev) => ({ ...prev, [i]: { ...prev[i], color } }));

  const updateQty = (i: number, delta: number) =>
    setStates((prev) => ({
      ...prev,
      [i]: { ...prev[i], quantity: Math.max(0, prev[i].quantity + delta) },
    }));

  const selectedCount = Object.values(states).filter((s) => s.selected).length;

  const collapseLabel = (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-steps font-medium tracking-wide">Step 1 of 4</span>
      <div className="h-px bg-steps mt-2" />
      <span className="cameras-title">Choose your cameras</span>
    </div>
  );

  const items: CollapseProps["items"] = [
    {
      key: "cameras",
      label: collapseLabel,
      extra: selectedCount > 0 ? (
        <span className="text-xs font-semibold text-purple">
          {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
        </span>
      ) : undefined,
      children: (
        <div className="grid grid-cols-2 gap-4">
          {cameraOptions.map((cam, i) => {
            const { color, quantity, selected } = states[i];
            return (
              <div
                key={i}
                onClick={() => toggleSelect(i)}
                className={`relative flex gap-4 p-4 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                  selected ? "border-purple" : "border-gray-200"
                }`}
              >
                {/* Discount tag */}
                {cam.discount && (
                  <span className="absolute -top--1 -left--1 bg-purple text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    Save {cam.discount}%
                  </span>
                )}

                {/* Image */}
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden mt-5 flex items-center justify-center">
                  {cam.image ? (
                    <img
                      src={cam.image}
                      alt={cam.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">📷</span>
                  )}
                </div>

                {/* Right side */}
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-semibold text-textBlack">{cam.name}</h3>
                  <p className="text-sm text-gray-500">{cam.description}</p>

                  {/* Color options */}
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {(["white", "black"] as ColorOption[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(i, c)}
                        className={`px-3 py-1 text-sm rounded-md border capitalize transition-colors ${
                          color === c
                            ? "bg-bg-Green/40 border-borderGreen text-black"
                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Quantity + Price */}
                  <div
                    className="flex items-center gap-4 mt-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-base leading-none"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQty(i, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-base leading-none"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-purple font-bold">
                      ${(cam.priceBefore * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
  ];
  

  return (
    <Collapse
      items={items}
      defaultActiveKey={["cameras"]}
      className="bg-lightPurple"
      expandIconPlacement="end"
      expandIcon={({ isActive }) => (
        <svg
          style={{ color: "#4E2FD2" }}
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
