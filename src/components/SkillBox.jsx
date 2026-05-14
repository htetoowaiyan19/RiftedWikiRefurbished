import React from "react";
import { DescriptionText } from "./DescriptionText";
import SkillLevelControl from "./SkillLevelControl";

const SkillBox = ({ character, handleChange, levels }) => {
  const normalAttack = character.abilities.normalAttack;
  const chargedAttack = character.abilities.chargedAttack;
  const normalSkill = character.abilities.normalSkill;
  const riftedSkill = character.abilities.riftedSkill;

  const skillEntries = [
    {
      skill: normalAttack,
      type: "Normal Attack",
      field: "normalAttackLevel",
      level: levels.normalAttackLevel,
      multipliers: character.abilities.normalAttack.multipliers,
    },
    {
      skill: chargedAttack,
      type: "Charged Attack",
      field: "chargedAttackLevel",
      level: levels.chargedAttackLevel,
      multipliers: character.abilities.chargedAttack.multipliers,
    },
    {
      skill: normalSkill,
      type: "Normal Skill",
      field: "normalSkillLevel",
      level: levels.normalSkillLevel,
      multipliers: character.abilities.normalSkill.multipliers,
    },
    {
      skill: riftedSkill,
      type: "Rifted Skill",
      field: "riftedSkillLevel",
      level: levels.riftedSkillLevel,
      multipliers: character.abilities.riftedSkill.multipliers,
    },
  ];

  return (
    <div className="wiki-entry-stack">
      {skillEntries.map(({ skill, type, field, level, multipliers }) => (
        <article key={field} className="wiki-entry">
          <SkillLevelControl
            name={skill.name}
            type={type}
            field={field}
            min={1}
            max={15}
            handleChange={handleChange}
          />
          <div className="wiki-entry-body">
            <DescriptionText text={skill.desc} level={level} multipliers={multipliers} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default SkillBox;
