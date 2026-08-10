import { SensorOption, SensorState } from '@/types/builder';
import { Collapse, CollapseProps } from 'antd';
import React, { useEffect, useState } from 'react'

function SensorSelector({ isExpanded, setIsExpanded, onSelectionChange, onNextClick, initialSelections }: { isExpanded: boolean, setIsExpanded: (value: boolean) => void, onSelectionChange: (selected: { sensor: SensorOption; quantity: number; color?: string, image?: string }[]) => void, onNextClick: () => void, initialSelections?: { sensor: SensorOption; quantity: number; color?: string, image?: string }[] }) {

  const [sensorOptions, setSensorOptions] = useState<SensorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<Record<string, SensorState>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch sensor options on mount
  useEffect(() => {
    async function fetchSensorOptions() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/RanaNassar-WD/bundle-builder-rana-nassar/master/public/sensorOption.json');
        const data = await response.json();
        setSensorOptions(data);
      } catch (error) {
        console.error('Failed to fetch sensor options:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSensorOptions();
  }, []);

  // Initialize states when sensorOptions loads
  useEffect(() => {
    if (sensorOptions.length === 0 || isInitialized) return;

    const initialState: Record<string, SensorState> = {};

    // If we have saved selections, restore them
    if (initialSelections && initialSelections.length > 0) {
      sensorOptions.forEach((sensor, i) => {
        if (sensor.options && sensor.options.length > 0) {
          sensor.options.forEach((opt) => {
            const key = `${i}-${opt.text}`;
            const savedItem = initialSelections.find(
              item => item.sensor.id === sensor.id && item.color === opt.text
            );
            initialState[key] = {
              color: opt.text,
              quantity: savedItem?.quantity || 1,
              selected: !!savedItem,
            };
          });
        } else {
          const key = `${i}-default`;
          const savedItem = initialSelections.find(item => item.sensor.id === sensor.id);
          initialState[key] = {
            color: "",
            quantity: savedItem?.quantity || 1,
            selected: !!savedItem,
          };
        }
      });
    } else {
      // Default initialization: nothing selected for sensors
      sensorOptions.forEach((sensor, i) => {
        if (sensor.options && sensor.options.length > 0) {
          sensor.options.forEach((opt) => {
            const key = `${i}-${opt.text}`;
            initialState[key] = {
              color: opt.text,
              quantity: 1,
              selected: false,
            };
          });
        } else {
          const key = `${i}-default`;
          initialState[key] = {
            color: "",
            quantity: 1,
            selected: false,
          };
        }
      });
    }

    setStates(initialState);
    setIsInitialized(true);
  }, [sensorOptions, initialSelections, isInitialized]);


  useEffect(() => {
    if (!isInitialized || sensorOptions.length === 0) return;

    const selected = Object.entries(states)
      .filter(([_, s]) => s.selected)
      .map(([key, s]) => {
        const [i] = key.split("-");
        const sensor = sensorOptions[Number(i)];
        if (!sensor) return null;
        const optionImage = sensor.options?.find((opt) => opt.text === s.color)?.image ?? sensor.image;
        return {
          sensor,
          quantity: s.quantity,
          color: s.color,
          image: optionImage,
        };
      })
      .filter(item => item !== null);
    onSelectionChange(selected);
  }, [states, onSelectionChange, isInitialized, sensorOptions]);

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

  const getActiveColor = (i: number, sensor: SensorOption) => {
    if (!sensor.options || sensor.options.length === 0) return "";


    for (const opt of sensor.options) {
      if (isColorSelected(i, opt.text)) {
        return opt.text;
      }
    }

    return sensor.options[0].text;
  };

  const selectedCount = Object.values(states).filter((s) => s.selected).length;

  if (loading || sensorOptions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow">
        <span className="text-gray-600">Loading sensors...</span>
      </div>
    );
  }

  const collapseLabel = (
    <div className="flex flex-col gap-1 " >
      <span className="step-label">Step 3 of 4</span>
      <div className="h-px bg-steps mt-2" />
      <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.4417 8.10826C22.4417 8.90825 21.9084 9.44157 21.1084 9.44157H10.4417C9.64173 9.44157 9.1084 8.90825 9.1084 8.10826V2.10834C9.1084 1.30835 9.64173 0.775024 10.4417 0.775024H21.1084C21.9084 0.775024 22.4417 1.30835 22.4417 2.10834V8.10826Z" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5078 4.77502V5.44168" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.1748 4.77502V5.44168" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21.9916 15.5084C18.6132 18.8417 12.9375 18.8417 9.55908 15.5084" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26.316 19.7751C20.5052 25.5084 11.0457 25.5084 5.23486 19.7751" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30.7749 24.8413C22.3965 32.8412 9.15328 32.7079 0.774902 24.708" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


        <span className="cameras-title">Choose your Sensors</span>
      </div>
    </div>
  );
  const items: CollapseProps["items"] = [
    {
      key: "sensors",
      label: collapseLabel,
      extra: selectedCount > 0 ? (
        <span className="selected-text">
          {selectedCount} selected
        </span>
      ) : undefined,
      children: (
        <>
          <div className="grid grid-cols-2 gap-4 bg-lightPurple p-4 -m-4">
            {sensorOptions.map((sensor, i) => {
              const activeColor = getActiveColor(i, sensor);
              const hasAnySelected = sensor.options?.some(opt => isColorSelected(i, opt.text)) ?? isColorSelected(i, "");
              const currentColorImage = sensor.options?.find(opt => opt.text === activeColor)?.image ?? sensor.image;

              const isCardClickable = !sensor.options || sensor.options.length === 0;

              const handleCardClick = () => {
                if (isCardClickable) {
                  toggleSelect(i, "");
                }
              };

              return (
                <div
                  key={`${i}-${sensor.id}`}
                  className={`relative flex gap-4 p-4 bg-white rounded-xl border-2 transition-colors ${hasAnySelected ? "border-purple" : "border-gray-200"
                    } ${isCardClickable ? "cursor-pointer hover:border-purple/50" : ""}`}
                  onClick={handleCardClick}
                >
                  {/* Discount tag */}
                  {sensor.discount && (
                    <span className="absolute -top--1 -left--1 bg-purple text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Save {sensor.discount}%
                    </span>
                  )}

                  {/* Image */}
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden mt-5 flex items-center justify-center">
                    {currentColorImage ? (
                      <img
                        src={currentColorImage}
                        alt={sensor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">📷</span>
                    )}
                  </div>

                  {/* Right side */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="cards-title">{sensor.name}</h3>
                    <p className="cards-description">
                      {sensor.description}{" "}
                      <a target="_blank" href="https://www.linkedin.com/in/rana-nassar-28a601192/" className="cards-description-link">
                        Learn More
                      </a>
                    </p>

                    {/* Color options */}
                    {sensor.options?.length ? (
                      <div
                        className="flex justify-start items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sensor.options.map((option) => {
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
                                alt={`${sensor.name} ${option.text}`}
                                className="cards-options-img"
                              />
                              <span className="cards-options">{option.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {/* Quantity + Price */}
                    {sensor.options?.length ? (
                      sensor.options.filter(opt => isColorSelected(i, opt.text)).length > 0 ? (
                        <div className="space-y-2">
                          {sensor.options.filter(opt => isColorSelected(i, opt.text)).map((option) => {
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
                                  {sensor.priceAfter ? (
                                    <>
                                      <span className="price-before">${sensor.priceBefore.toFixed(2)}</span>
                                      <span className="price-after">${sensor.priceAfter.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <span className="price-after">${sensor.priceBefore.toFixed(2)}</span>
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
                          {sensor.priceAfter ? (
                            <>
                              <span className="price-before">${sensor.priceBefore.toFixed(2)}</span>
                              <span className="price-after">${sensor.priceAfter.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="price-after">${sensor.priceBefore.toFixed(2)}</span>
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
              Next: Choose your Extras
            </button>
          </div>
        </>
      ),
    }
  ]
  return (
    <Collapse
      className={`rounded-lg shadow ${isExpanded ? "bg-lightPurple" : ""}`}
      items={items}
      activeKey={isExpanded ? ["sensors"] : []}
      // defaultActiveKey={["cameras"]}
      expandIconPlacement="end"
      style={isExpanded ? { backgroundColor: "var(--color-lightPurple)" } : {}}
      onChange={(keys) => setIsExpanded(Array.isArray(keys) ? keys.includes("sensors") : keys === "sensors")}
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

export default SensorSelector