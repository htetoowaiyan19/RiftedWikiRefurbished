import React, { useState } from "react";
import { Button, ButtonGroup, Popover, TextInput } from "flowbite-react";

const StatLevelControl = ({ name, type, min, max, handleChange }) => {
  const [level, setLevel] = useState(min);

  const syncLevel = (nextLevel) => {
    setLevel(nextLevel);

    if (type === "character") {
      handleChange({ characterLevel: nextLevel });
    } else if (type === "relic") {
      handleChange(nextLevel);
    }
  };

  const decrement = () => syncLevel(Math.max(level - 1, min));
  const increment = () => syncLevel(Math.min(level + 1, max));

  const changeLevel = (value) => {
    const numVal = Number(value);

    if (!Number.isNaN(numVal)) {
      syncLevel(Math.min(Math.max(numVal, min), max));
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold text-white">{name}'s Stats</h2>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Level {level}
          </span>
        </div>
      </div>

      <ButtonGroup>
        <Button color="alternative" onClick={decrement}>
          {"<"}
        </Button>
        <Popover
          content={
            <div className="w-64 bg-slate-900 text-sm text-slate-300">
              <div className="border-b border-white/10 bg-white/5 px-3 py-2">
                <h3 className="font-semibold text-white">Change Level</h3>
              </div>
              <div className="px-3 py-2">
                <TextInput
                  id="levelIn"
                  type="number"
                  min={min}
                  max={max}
                  onChange={(e) => changeLevel(e.target.value)}
                  value={level}
                />
              </div>
            </div>
          }
        >
          <Button color="alternative">{level}</Button>
        </Popover>
        <Button color="alternative" onClick={increment}>
          {">"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default StatLevelControl;
