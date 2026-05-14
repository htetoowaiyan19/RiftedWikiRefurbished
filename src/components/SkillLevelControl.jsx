import React, { useState } from "react";

const SkillLevelControl = ({ name, type, field, min, max, handleChange }) => {
  const [level, setLevel] = useState(min);

  const syncLevel = (nextLevel) => {
    setLevel(nextLevel);
    handleChange({ [field]: nextLevel });
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
    <header className="wiki-entry-header">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="wiki-entry-title">
          {type} - {name}
        </h3>
        <span className="wiki-entry-kicker">Level {level}</span>
      </div>

      <div className="wiki-stepper">
        <button type="button" className="wiki-stepper-button" onClick={decrement} disabled={level <= min}>
          {"<"}
        </button>
        <input
          aria-label={`${name} level`}
          className="wiki-stepper-value"
          type="number"
          min={min}
          max={max}
          onChange={(e) => changeLevel(e.target.value)}
          value={level}
        />
        <button type="button" className="wiki-stepper-button" onClick={increment} disabled={level >= max}>
          {">"}
        </button>
      </div>
    </header>
  );
};

export default SkillLevelControl;
