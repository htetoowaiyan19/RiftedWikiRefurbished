import React, { useMemo, useState } from "react";
import {
  BowArrow,
  Component,
  Cpu,
  Flame,
  GitCompare,
  Heart,
  Hexagon,
  Shield,
  SmartphoneCharging,
  Sword,
  Swords,
  Zap,
} from "lucide-react";
import { useParams } from "react-router-dom";
import characters from "../data/characters.json";
import AlertBox from "./AlertBox";
import TalentBox from "./TalentBox";
import SkillBox from "./SkillBox";
import FragmentBox from "./FragmentBox";
import StatLevelControl from "./StatLevelControl";
import NotFoundComponent from "./NotFoundComponent";

const CHARACTER_STAT_SCALE = {
  baseHp: 0.06441,
  baseAtk: 0.038294,
  basePwr: 0.038294,
  baseDef: 0.040182,
};

const SUBSTAT_GLOBAL_MULTIPLIER = 0.162128;

const DetailSection = ({ title, children }) => (
  <section className="wiki-panel mt-6 p-5 sm:p-6">
    <div className="mb-4 border-b border-white/10 pb-4">
      <h2 className="wiki-section-title">{title}</h2>
    </div>
    {children}
  </section>
);

const CharacterDetail = () => {
  const { id } = useParams();

  const [levels, setLevels] = useState({
    characterLevel: 1,
    normalAttackLevel: 1,
    chargedAttackLevel: 1,
    normalSkillLevel: 1,
    riftedSkillLevel: 1,
  });

  const character = characters.find((item) => item.id === parseInt(id)) || null;

  if (!character) {
    return (
      <NotFoundComponent
        params={{
          message: "Sorry, no character found.",
          route: "/characters",
          type: "character",
          data: characters,
        }}
      />
    );
  }

  const handleChange = (value) => {
    setLevels((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const getSubMultiplier = (subLevel) => {
    const tier = Math.floor((subLevel - 50) / 10) + 1;
    const clampedTier = Math.min(Math.max(tier, 0), 4);
    return clampedTier * SUBSTAT_GLOBAL_MULTIPLIER;
  };

  const stats = useMemo(() => {
    const hp = Math.round(
      character.baseStats.hp * (1 + CHARACTER_STAT_SCALE.baseHp * (levels.characterLevel - 1))
    );
    const atk = Math.round(
      character.baseStats.atk * (1 + CHARACTER_STAT_SCALE.baseAtk * (levels.characterLevel - 1))
    );
    const pwr = Math.round(
      character.baseStats.pwr * (1 + CHARACTER_STAT_SCALE.basePwr * (levels.characterLevel - 1))
    );
    const def = Math.round(
      character.baseStats.def * (1 + CHARACTER_STAT_SCALE.baseDef * (levels.characterLevel - 1))
    );
    const subValue =
      levels.characterLevel >= 40
        ? (character.subStat.value * (1 + getSubMultiplier(levels.characterLevel))).toFixed(2)
        : 0;

    return { hp, atk, pwr, def, subValue };
  }, [character, levels.characterLevel]);

  const isTechnology = character.baseData.type === "Rifted Technology";

  const statCards = [
    [
      { label: "HP", value: stats.hp, icon: Heart, color: "text-rose-300" },
      { label: "Physical ATK", value: stats.atk, icon: Sword, color: "text-amber-300" },
      { label: "Magic PWR", value: stats.pwr, icon: Flame, color: "text-fuchsia-300" },
    ],
    [
      { label: "DEF", value: stats.def, icon: Shield, color: "text-emerald-300" },
      {
        label: character.baseData.type,
        value: character.baseData.faction,
        icon: isTechnology ? Cpu : Component,
        color: "text-cyan-300",
      },
      { label: "Relic Type", value: character.baseData.relicType, icon: Swords, color: "text-sky-300" },
    ],
    [
      {
        label: isTechnology ? "Flux Capacity" : "Echo Memory Capacity",
        value: isTechnology ? character.typeStats.fluxCapacity : character.typeStats.echoMemoryCapacity,
        icon: isTechnology ? GitCompare : Hexagon,
        color: "text-orange-300",
      },
      {
        label: isTechnology ? "Max Surge" : "Energy Capacity",
        value: isTechnology ? character.typeStats.surgeCapacity : character.typeStats.maxEnergy,
        icon: isTechnology ? SmartphoneCharging : Zap,
        color: "text-violet-300",
      },
      {
        label: character.subStat.type,
        value: `${stats.subValue}%`,
        icon: BowArrow,
        color: "text-lime-300",
      },
    ],
  ];

  return (
    <div className="wiki-page">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <div className="wiki-badge mb-4">{character.baseData.type}</div>
          <h1 className="wiki-title">{character.name}</h1>
          <p className="wiki-subtle mt-3 max-w-2xl text-base">
            {character.baseData.faction} specialist aligned with the {character.baseData.relicType} relic path.
          </p>
        </div>
      </section>

      <section className="wiki-panel mt-8 p-5 sm:p-6">
        <StatLevelControl
          name={character.name}
          type="character"
          min={1}
          max={90}
          handleChange={handleChange}
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {statCards.map((group, groupIndex) => (
            <div key={groupIndex} className="wiki-detail-card space-y-3">
              {group.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Icon size={16} className={color} />
                    <span>{label}</span>
                  </div>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <AlertBox
        params={{
          message:
            "Stats such as SPD, Charge, Crit Rate, and Crit DMG for all characters are default at 30, 100, 5.0%, 50.0% respectively.",
        }}
      />

      <DetailSection title="Talents">
        <TalentBox character={character} />
      </DetailSection>

      <DetailSection title="Skills">
        <SkillBox character={character} handleChange={handleChange} levels={levels} />
      </DetailSection>

      <DetailSection title="Fragments">
        <FragmentBox character={character} />
      </DetailSection>
    </div>
  );
};

export default CharacterDetail;
