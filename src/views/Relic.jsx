import React, { useDeferredValue, useMemo, useState } from "react";
import { Search, Shield, X } from "lucide-react";
import relics from "../data/relics.json";
import RelicCard from "../components/RelicCard";

const Relic = () => {
  const [selectedRelicType, setSelectedRelicType] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const relicTypes = ["All", ...new Set(relics.map((relic) => relic.baseData.relicType))];

  const filteredRelics = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return relics.filter((relic) => {
      const relicTypeMatch =
        selectedRelicType === "All" || relic.baseData.relicType === selectedRelicType;
      const queryMatch =
        !normalizedQuery ||
        [
          relic.name,
          relic.baseData.relicType,
          relic.baseData.version,
          relic.passive.name,
          relic.passive.desc,
          relic.stats.mainStat.type,
          relic.stats.subStat.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return relicTypeMatch && queryMatch;
    });
  }, [deferredQuery, selectedRelicType]);

  return (
    <div className="wiki-page flex flex-col">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <div className="wiki-badge mb-4">Relic Codex</div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="wiki-title">Relics</h1>
              <p className="wiki-subtle mt-3 max-w-2xl">
                Compare weapon roles, passives, and forge-ready options in a cleaner archive view.
              </p>
            </div>
            <div className="wiki-panel-solid px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Visible Entries</p>
              <p className="mt-2 text-3xl font-bold text-white">{filteredRelics.length}</p>
            </div>
          </div>

          <label className="relative mt-6 block max-w-2xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search relics, passives, or stat types..."
              className="wiki-input pl-11 pr-12"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </section>

      <div className="wiki-split-layout mt-8 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="wiki-panel wiki-split-column p-5">
          <div className="mb-5 flex items-center gap-2 text-white">
            <Shield size={18} className="text-cyan-200" />
            <h2 className="text-xl font-bold">Filters</h2>
          </div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Relic Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {relicTypes.map((relicType) => (
              <button
                key={relicType}
                onClick={() => setSelectedRelicType(relicType)}
                className={`wiki-chip ${selectedRelicType === relicType ? "wiki-chip-active" : ""}`}
              >
                {relicType}
              </button>
            ))}
          </div>
        </aside>

        <section className="wiki-panel wiki-split-column p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="wiki-section-title">Relic Index</h2>
              <p className="wiki-subtle mt-2">All relics matching the current filter and search query.</p>
            </div>
          </div>

          {filteredRelics.length > 0 ? (
            <div className="wiki-data-grid mt-5">
              {filteredRelics.map((relic) => (
                <RelicCard key={relic.id} data={relic} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/4 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-white">No relics found.</p>
              <p className="mt-2 text-sm text-slate-400">
                Try clearing the search or switching to a broader relic type.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Relic;
