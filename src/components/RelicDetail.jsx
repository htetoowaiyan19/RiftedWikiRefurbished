import React, { useMemo, useState } from "react";
import { BowArrow, Flame, Sparkles, Sword, Swords } from "lucide-react";
import { useParams } from "react-router-dom";
import relics from "../data/relics.json";
import StatLevelControl from "./StatLevelControl";
import { DescriptionText } from "./DescriptionText";
import NotFoundComponent from "./NotFoundComponent";

const RELIC_STAT_SCALE = {
  base: 0.138294,
  sub: 0.042782,
};

const RelicDetail = () => {
  const { id } = useParams();

  const [level, setLevel] = useState(1);
  const [forge, setForge] = useState(1);

  const relic = relics.find((item) => item.id === parseInt(id)) || null;

  if (!relic) {
    return (
      <NotFoundComponent
        params={{ message: "Sorry, no relic found.", route: "/relics", type: "relic", data: relics }}
      />
    );
  }

  const stats = useMemo(() => {
    const mainStatValue = Math.round(
      relic.stats.mainStat.value * (1 + RELIC_STAT_SCALE.base * (level - 1))
    );

    const subStatValue =
      relic.stats.subStat.value > 0
        ? relic.stats.subStat.type === "Intelligence Unit" || relic.stats.subStat.type === "Knowledge Unit" || relic.stats.subStat.type === "SPD"
          ? Math.round(relic.stats.subStat.value * (1 + RELIC_STAT_SCALE.sub * (level - 1)))
          : `${(relic.stats.subStat.value * (1 + RELIC_STAT_SCALE.sub * (level - 1))).toFixed(2)}%`
        : 0;

    return { mainStatValue, subStatValue };
  }, [level, relic]);

  return (
    <div className="wiki-page">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <div className="wiki-badge mb-4">Relic Detail</div>
          <h1 className="wiki-title">{relic.name}</h1>
          <p className="wiki-subtle mt-3 max-w-2xl text-base">
            {relic.baseData.relicType} relic from version {relic.baseData.version}.
          </p>
        </div>
      </section>

      <section className="wiki-panel mt-8 p-5 sm:p-6">
        <StatLevelControl name={relic.name} type="relic" min={1} max={90} handleChange={setLevel} />

        <div className="wiki-detail-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200">
              {relic.stats.mainStat.type === "Physical ATK" ? (
                <Sword size={16} className="text-amber-300" />
              ) : (
                <Flame size={16} className="text-fuchsia-300" />
              )}
              <span>{relic.stats.mainStat.type}</span>
            </div>
            <span className="font-semibold text-white">{stats.mainStatValue}</span>
          </div>

          {relic.stats.subStat.type !== "" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <BowArrow size={16} className="text-lime-300" />
                <span>{relic.stats.subStat.type}</span>
              </div>
              <span className="font-semibold text-white">{stats.subStatValue}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200">
              <Swords size={16} className="text-cyan-300" />
              <span>Relic Type</span>
            </div>
            <span className="font-semibold text-white">{relic.baseData.relicType}</span>
          </div>
        </div>
      </section>

      {relic.passive.name !== "" && (
        <section className="wiki-panel mt-6 p-5 sm:p-6">
          <article className="wiki-entry">
            <header className="wiki-entry-header">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="wiki-entry-title">{relic.passive.name}</h2>
                <span className="wiki-entry-kicker">Forge {forge}</span>
              </div>

              <div className="wiki-stepper">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="wiki-stepper-button"
                    disabled={forge === value}
                    onClick={() => setForge(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </header>
            <div className="wiki-entry-body">
              <DescriptionText text={relic.passive.desc} level={forge} multipliers={relic.passive.forge} />
            </div>
          </article>
        </section>
      )}

      {relic.passive.name === "" && (
        <section className="wiki-panel mt-6 p-5 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-white">
            <Sparkles size={16} className="text-cyan-200" />
            <span className="font-semibold">No passive listed for this relic.</span>
          </div>
        </section>
      )}
    </div>
  );
};

export default RelicDetail;
