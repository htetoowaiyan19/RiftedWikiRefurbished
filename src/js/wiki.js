import characters from "../data/characters.json";
import relics from "../data/relics.json";
import matters from "../data/matters.json";
import mechanics from "../data/mechanics.json";

const textFixups = [
  [/\u00c3\u2014/g, "\u00d7"],
  [/\u00e2\u20ac\u00a2/g, "\u2022"],
  [/\u00e2\u20ac\u201c/g, "\u2013"],
  [/\u00e2\u20ac\u201d/g, "\u2014"],
  [/\u00e2\u2020\u2018/g, "\u2191"],
  [/\u00e2\u2020\u201c/g, "\u2193"],
];

export const normalizeWikiText = (value = "") =>
  textFixups.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);

export const getRarityClassName = (rarity) => {
  switch (rarity) {
    case 5:
      return "text-amber-300";
    case 4:
      return "text-fuchsia-300";
    case 3:
      return "text-sky-300";
    case 2:
      return "text-emerald-300";
    default:
      return "text-slate-300";
  }
};

export const getMechanicTag = (title) => {
  if (title.startsWith("Technology Attribute")) {
    return "Technology Attribute";
  }

  if (title.startsWith("Disorder Attribute")) {
    return "Disorder Attribute";
  }

  if (title.startsWith("Disordered Reaction")) {
    return "Disordered Reaction";
  }

  if (title.startsWith("Rifted")) {
    return "Core System";
  }

  return "Special Rule";
};

export const globalSearchItems = [
  ...characters.map((character) => ({
    id: `character-${character.id}`,
    type: "Character",
    title: character.name,
    route: `/character/${character.id}`,
    meta: `${character.baseData.type} • ${character.baseData.faction} • ${character.baseData.relicType}`,
    description: character.talents.coreTalent.desc,
    searchText: [
      character.name,
      character.baseData.type,
      character.baseData.faction,
      character.baseData.relicType,
      character.baseData.version,
      character.talents.coreTalent.name,
      character.talents.coreTalent.desc,
      character.talents.riftedTalent.name,
      character.talents.riftedTalent.desc,
      character.abilities.normalAttack.name,
      character.abilities.normalAttack.desc,
      character.abilities.chargedAttack.name,
      character.abilities.chargedAttack.desc,
      character.abilities.normalSkill.name,
      character.abilities.normalSkill.desc,
      character.abilities.riftedSkill.name,
      character.abilities.riftedSkill.desc,
    ]
      .map(normalizeWikiText)
      .join(" ")
      .toLowerCase(),
  })),
  ...relics.map((relic) => ({
    id: `relic-${relic.id}`,
    type: "Relic",
    title: relic.name,
    route: `/relic/${relic.id}`,
    meta: `${relic.baseData.relicType} • ${relic.baseData.version}`,
    description:
      relic.passive.desc ||
      `${relic.stats.mainStat.type} +${relic.stats.mainStat.value}${
        relic.stats.subStat.type ? `\nSub Stat: ${relic.stats.subStat.type}` : ""
      }`,
    searchText: [
      relic.name,
      relic.baseData.relicType,
      relic.baseData.version,
      relic.passive.name,
      relic.passive.desc,
      relic.stats.mainStat.type,
      relic.stats.subStat.type,
    ]
      .map(normalizeWikiText)
      .join(" ")
      .toLowerCase(),
  })),
  ...matters.map((matter) => ({
    id: `matter-${matter.id}`,
    type: "Matter",
    title: matter.name,
    route: `/matter/${matter.id}`,
    meta: `${matter.version} • ${matter.rarity}-Star Set`,
    description: `2-Piece Set: ${matter.set2}\n4-Piece Set: ${matter.set4}\n5-Piece Set: ${matter.set5}`,
    searchText: [
      matter.name,
      matter.version,
      matter.set2,
      matter.set4,
      matter.set5,
      ...(matter.fusion || []).flatMap((fusion) => [fusion.name, fusion.set]),
    ]
      .map(normalizeWikiText)
      .join(" ")
      .toLowerCase(),
  })),
  ...mechanics.map((mechanic, index) => ({
    id: `mechanic-${index}`,
    type: "Gameplay",
    title: normalizeWikiText(mechanic.title),
    route: "/gameplay",
    meta: getMechanicTag(normalizeWikiText(mechanic.title)),
    description: normalizeWikiText(mechanic.desc),
    searchText: [mechanic.title, mechanic.desc, mechanic.fullDesc]
      .map(normalizeWikiText)
      .join(" ")
      .toLowerCase(),
  })),
];
