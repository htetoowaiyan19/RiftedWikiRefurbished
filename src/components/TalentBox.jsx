import React from "react";
import { DescriptionText } from "./DescriptionText";

const TalentBox = ({ character }) => {
  const coreTalentName = character.talents.coreTalent.name;
  const coreTalentDesc = character.talents.coreTalent.desc;
  const riftedTalentName = character.talents.riftedTalent.name;
  const riftedTalentDesc = character.talents.riftedTalent.desc;
  const otherTalents = character.talents.others || [];

  const talentEntries = [
    { title: `Core Talent - ${coreTalentName}`, desc: coreTalentDesc },
    { title: `Rifted Talent - ${riftedTalentName}`, desc: riftedTalentDesc },
    ...otherTalents.map((talent) => ({ title: talent.name, desc: talent.desc })),
  ];

  return (
    <div className="wiki-entry-stack">
      {talentEntries.map((talent) => (
        <article key={talent.title} className="wiki-entry">
          <header className="wiki-entry-header">
            <h3 className="wiki-entry-title">{talent.title}</h3>
          </header>
          <div className="wiki-entry-body">
            <DescriptionText text={talent.desc} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default TalentBox;
