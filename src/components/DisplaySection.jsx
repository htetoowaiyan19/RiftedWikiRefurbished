import React from "react";
import { ArrowRight } from "lucide-react";
import characters from "../data/characters.json";
import relics from "../data/relics.json";
import matters from "../data/matters.json";
import CharacterCard from "../components/CharacterCard";
import RelicCard from "../components/RelicCard";
import MatterCard from "../components/MatterCard";
import { Link } from "react-router-dom";

const DisplaySection = ({ type }) => {
  const configMap = {
    character: {
      title: "Featured Characters",
      description: "Frontline units, specialists, and experimental fighters currently archived.",
      route: "/characters",
      data: characters,
      component: CharacterCard,
    },
    relic: {
      title: "Signature Relics",
      description: "Weapons and relics tuned for every battle role in the roster.",
      route: "/relics",
      data: relics,
      component: RelicCard,
    },
    matter: {
      title: "Matter Sets",
      description: "Build-defining set bonuses and fusion combinations for long-form theorycrafting.",
      route: "/matters",
      data: matters,
      component: MatterCard,
    },
  };

  const config = configMap[type];

  if (!config) {
    return <p className="text-red-400">Invalid type: {type}</p>;
  }

  const { title, description, route, data, component: CardComponent } = config;
  const displayedItems = [...data].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <section className="wiki-panel mt-8 overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="wiki-badge mb-3">Archive Spotlight</div>
          <h2 className="wiki-section-title">{title}</h2>
          <p className="wiki-subtle mt-2 max-w-2xl">{description}</p>
        </div>

        <Link
          to={route}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
        >
          Browse Archive
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {displayedItems.map((item) => (
          <div key={item.id} className="w-[18rem] shrink-0">
            <CardComponent data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplaySection;
