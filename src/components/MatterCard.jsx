import React from "react";
import { Info, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DescriptionText } from "./DescriptionText";
import { getRarityClassName } from "../js/wiki";

const MatterCard = ({ data }) => {
  const rarityClass = getRarityClassName(data.rarity);

  return (
    <Link to={`/matter/${data.id}`} className="block h-full">
      <article className="wiki-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="wiki-badge mb-3">Matter Set</div>
            <h3 className="text-2xl font-bold text-white">{data.name}</h3>
          </div>
          <div className={`flex gap-1 ${rarityClass}`}>
            {[...Array(data.rarity)].map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-cyan-200" />
            <span>{data.version}</span>
          </div>
          {!!data.fusion?.length && (
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-200" />
              <span>{data.fusion.length} Fusion Bonus</span>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-200">
          <DescriptionText text={`2-Piece Set: ${data.set2}`} />
        </div>
      </article>
    </Link>
  );
};

export default MatterCard;
