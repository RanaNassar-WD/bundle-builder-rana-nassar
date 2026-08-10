"use client";

import { useEffect, useState } from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { CameraOption, CameraState } from "@/types/builder";

export default function CameraSelector({ onSelectionChange, onNextClick, initialSelections }: { onSelectionChange: (selected: { cam: CameraOption; quantity: number; color?: string, image?: string }[]) => void, onNextClick: () => void, initialSelections?: { cam: CameraOption; quantity: number; color?: string, image?: string }[] }) {
  const [cameraOptions, setCameraOptions] = useState<CameraOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [states, setStates] = useState<Record<string, CameraState>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch camera options on mount
  useEffect(() => {
    async function fetchCameraOptions() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/RanaNassar-WD/bundle-builder-rana-nassar/master/public/cameraOptions.json');
        const data = await response.json();
        setCameraOptions(data);
      } catch (error) {
        console.error('Failed to fetch camera options:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCameraOptions();
  }, []);

  // Initialize states when cameraOptions loads
  useEffect(() => {
    if (cameraOptions.length === 0 || isInitialized) return;

    const initialState: Record<string, CameraState> = {};

    // If we have saved selections, restore them
    if (initialSelections && initialSelections.length > 0) {
      cameraOptions.forEach((camera, i) => {
        if (camera.options && camera.options.length > 0) {
          camera.options.forEach((opt) => {
            const key = `${i}-${opt.text}`;
            const savedItem = initialSelections.find(
              item => item.cam.id === camera.id && item.color === opt.text
            );
            initialState[key] = {
              color: opt.text,
              quantity: savedItem?.quantity || 1,
              selected: !!savedItem,
            };
          });
        } else {
          const key = `${i}-default`;
          const savedItem = initialSelections.find(item => item.cam.id === camera.id);
          initialState[key] = {
            color: "",
            quantity: savedItem?.quantity || 1,
            selected: !!savedItem,
          };
        }
      });
    } else {
      // Default initialization: select first camera, first color
      cameraOptions.forEach((camera, i) => {
        if (camera.options && camera.options.length > 0) {
          camera.options.forEach((opt, optIndex) => {
            const key = `${i}-${opt.text}`;
            initialState[key] = {
              color: opt.text,
              quantity: 1,
              selected: i === 0 && optIndex === 0,
            };
          });
        } else {
          const key = `${i}-default`;
          initialState[key] = {
            color: "",
            quantity: 1,
            selected: i === 0,
          };
        }
      });
    }

    setStates(initialState);
    setIsInitialized(true);
  }, [cameraOptions, initialSelections, isInitialized]);

  useEffect(() => {
    if (!isInitialized || cameraOptions.length === 0) return;

    const selected = Object.entries(states)
      .filter(([_, s]) => s.selected)
      .map(([key, s]) => {
        const [i] = key.split("-");
        const cam = cameraOptions[Number(i)];
        if (!cam) return null;
        const optionImage = cam.options?.find((opt) => opt.text === s.color)?.image ?? cam.image;
        return {
          cam,
          quantity: s.quantity,
          color: s.color,
          image: optionImage,
        };
      })
      .filter(item => item !== null);
    onSelectionChange(selected);
  }, [states, onSelectionChange, isInitialized, cameraOptions]);

  const toggleSelect = (i: number, color: string) => {
    const key = color ? `${i}-${color}` : `${i}-default`;
    setStates((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? { color, quantity: 1, selected: false }),
        selected: !prev[key]?.selected,
      },
    }));
  };

  const updateQty = (i: number, color: string, delta: number) => {
    const key = color ? `${i}-${color}` : `${i}-default`;
    setStates((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] ?? { color, quantity: 1, selected: false }),
        quantity: Math.max(1, (prev[key]?.quantity ?? 1) + delta),
      },
    }));
  };

  const isColorSelected = (i: number, color: string) => {
    const key = color ? `${i}-${color}` : `${i}-default`;
    return states[key]?.selected ?? false;
  };

  const getColorQuantity = (i: number, color: string) => {
    const key = color ? `${i}-${color}` : `${i}-default`;
    return states[key]?.quantity ?? 1;
  };

  const getActiveColor = (i: number, cam: CameraOption) => {
    if (!cam.options || cam.options.length === 0) return "";


    for (const opt of cam.options) {
      if (isColorSelected(i, opt.text)) {
        return opt.text;
      }
    }
    // Default to first option
    return cam.options[0].text;
  };



  const selectedCount = Object.values(states).filter((s) => s.selected).length;

  if (loading || cameraOptions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow">
        <span className="text-gray-600">Loading cameras...</span>
      </div>
    );
  }

  const collapseLabel = (
    <div className="flex flex-col gap-2 " >
      <span className="step-label">Step 1 of 4</span>
      <div className="h-px bg-steps mt-2" />
      <div className="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_68_9780)">
            <path d="M8.6665 24.9166V20.5833" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.3335 24.9166V20.5833" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22.75 24.9167L3.25 24.9167" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 5.14581C15.2436 5.14581 17.0625 6.96473 17.0625 9.20831C17.0625 11.4519 15.2436 13.2708 13 13.2708C10.7564 13.2708 8.9375 11.4519 8.9375 9.20831C8.9375 6.96473 10.7564 5.14581 13 5.14581Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.9731 16.25C12.7489 16.25 12.5669 16.432 12.5669 16.6562C12.5669 16.8805 12.7489 17.0625 12.9731 17.0625C13.1974 17.0625 13.3794 16.8805 13.3794 16.6562C13.3794 16.432 13.1974 16.25 12.9731 16.25Z" fill="#6F7882" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3.1875" y="0.75" width="19.625" height="19.625" rx="3.25" stroke="#6F7882" strokeWidth="1.5" />
          </g>
          <defs>
            <clipPath id="clip0_68_9780">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="cameras-title">Choose your cameras</span>
      </div>
    </div>
  );

  const items: CollapseProps["items"] = [
    {
      key: "cameras",
      label: collapseLabel,
      extra: selectedCount > 0 ? (
        <span className="selected-text">
          {selectedCount} selected
        </span>
      ) : undefined,
      children: (
        <>
          <div className="grid grid-cols-2 gap-4 bg-lightPurple p-4 -m-4">
            {cameraOptions.map((cam, i) => {
              const activeColor = getActiveColor(i, cam);
              const hasAnySelected = cam.options?.some(opt => isColorSelected(i, opt.text)) ?? isColorSelected(i, "");
              const currentColorImage = cam.options?.find(opt => opt.text === activeColor)?.image ?? cam.image;

              const isCardClickable = !cam.options || cam.options.length === 0;

              const handleCardClick = () => {
                if (isCardClickable) {
                  toggleSelect(i, "");
                }
              };

              return (
                <div
                  key={`${i}-${cam.id}`}
                  className={`relative flex gap-4 p-4 bg-white rounded-xl border-2 transition-colors ${hasAnySelected ? "border-purple" : "border-gray-200"
                    } ${isCardClickable ? "cursor-pointer hover:border-purple/50" : ""}`}
                  onClick={handleCardClick}
                >
                  {/* Discount tag */}
                  {cam.discount && (
                    <span className="absolute -top--1 -left--1 bg-purple text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Save {cam.discount}%
                    </span>
                  )}

                  {/* Image */}
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden mt-5 flex items-center justify-center">
                    {currentColorImage ? (
                      <img
                        src={currentColorImage}
                        alt={cam.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">📷</span>
                    )}
                  </div>

                  {/* Right side */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="cards-title">{cam.name}</h3>
                    <p className="cards-description">
                      {cam.description}{" "}
                      <a target="_blank" href="https://www.linkedin.com/in/rana-nassar-28a601192/" className="cards-description-link">
                        Learn More
                      </a>
                    </p>

                    {/* Color options */}
                    {cam.options?.length ? (
                      <div
                        className="flex justify-start items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cam.options.map((option) => {
                          const isSelected = isColorSelected(i, option.text);

                          return (
                            <button
                              key={option.text}
                              onClick={() => toggleSelect(i, option.text)}
                              className={`px-3 py-1 flex items-center justify-center gap-2 rounded-sm border transition-colors ${isSelected
                                ? "bg-bg-Green/40 border-borderGreen text-black"
                                : "border-gray-300 text-gray-600 hover:border-gray-400"
                                }`}
                            >
                              <img
                                src={option.image}
                                alt={`${cam.name} ${option.text}`}
                                className="cards-options-img"
                              />
                              <span className="cards-options">{option.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {/* Quantity + Price */}
                    {cam.options?.length ? (
                      cam.options.filter(opt => isColorSelected(i, opt.text)).length > 0 ? (
                        <div className="space-y-2">
                          {cam.options.filter(opt => isColorSelected(i, opt.text)).map((option) => {
                            const quantity = getColorQuantity(i, option.text);

                            return (
                              <div
                                key={`qty-${option.text}`}
                                className="flex items-start justify-between gap-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQty(i, option.text, -1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100 text-base leading-none"
                                  >
                                    −
                                  </button>
                                  <span className="w-6 text-center font-medium text-sm">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQty(i, option.text, 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100 text-base leading-none"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  {option.text}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  {cam.priceAfter ? (
                                    <>
                                      <span className="price-before">${cam.priceBefore.toFixed(2)}</span>
                                      <span className="price-after">${cam.priceAfter.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <span className="price-after">${cam.priceBefore.toFixed(2)}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null
                    ) : (
                      <div
                        className="flex items-start justify-between gap-4 mt-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(i, "", -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100 text-base leading-none"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-medium text-sm">
                            {getColorQuantity(i, "")}
                          </span>
                          <button
                            onClick={() => updateQty(i, "", 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-gray-100 text-base leading-none"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {cam.priceAfter ? (
                            <>
                              <span className="price-before">${cam.priceBefore.toFixed(2)}</span>
                              <span className="price-after">${cam.priceAfter.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="price-after">${cam.priceBefore.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
          <div className="flex justify-center  gap-4 bg-lightPurple p-4 -m-4">
            <button
              onClick={onNextClick}
              className="next-btn"
            >
              Next: Choose your plan
            </button>
          </div>
        </>
      ),
    },
  ];


  return (
    <Collapse
      className={`rounded-lg shadow ${isExpanded ? "bg-lightPurple" : ""}`}
      style={isExpanded ? { backgroundColor: "var(--color-lightPurple)" } : {}}
      items={items}
      defaultActiveKey={["cameras"]}
      expandIconPlacement="end"
      onChange={(keys) => setIsExpanded(Array.isArray(keys) ? keys.includes("cameras") : keys === "cameras")}
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
