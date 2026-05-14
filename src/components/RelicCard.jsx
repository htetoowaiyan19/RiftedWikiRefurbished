import React from "react";
import { Info, Sparkles, Star, Sword } from "lucide-react";
import { Link } from "react-router-dom";
import { getRarityClassName } from "../js/wiki";

const RelicCard = ({ data }) => {
  const rarityClass = getRarityClassName(data.baseData.rarity);

  return (
    <Link to={`/relic/${data.id}`} className="block h-full">
      <article className="wiki-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="wiki-badge mb-3">Relic</div>
            <h3 className="text-2xl font-bold text-white">{data.name}</h3>
          </div>
          <div className={`flex gap-1 ${rarityClass}`}>
            {[...Array(data.baseData.rarity)].map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Sword size={16} className="text-cyan-200" />
            <span>{data.baseData.relicType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={16} className="text-cyan-200" />
            <span>{data.baseData.version}</span>
          </div>
          {data.passive.name && (
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-200" />
              <span>{data.passive.name}</span>
            </div>
          )}
        </div>

      </article>
    </Link>
  );
};

export default RelicCard;
