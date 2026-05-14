import React, { useDeferredValue, useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import characters from "../data/characters.json";
import CharacterCard from "../components/CharacterCard";

const Character = () => {
  const [selectedFaction, setSelectedFaction] = useState("All");
  const [selectedRelic, setSelectedRelic] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const factions = [
    "All",
    ...new Set(
      characters.map((character) =>
        character.baseData.faction.startsWith("Fusion") ? "Fusion" : character.baseData.faction
      )
    ),
  ];
  const relics = ["All", ...new Set(characters.map((character) => character.baseData.relicType))];

  const filteredCharacters = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return characters.filter((character) => {
      const faction = character.baseData.faction.startsWith("Fusion")
        ? "Fusion"
        : character.baseData.faction;

      const factionMatch = selectedFaction === "All" || faction === selectedFaction;
      const relicMatch = selectedRelic === "All" || character.baseData.relicType === selectedRelic;
      const queryMatch =
        !normalizedQuery ||
        [
          character.name,
          character.baseData.type,
          character.baseData.faction,
          character.baseData.relicType,
          character.baseData.version,
          character.talents.coreTalent.name,
          character.talents.coreTalent.desc,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return factionMatch && relicMatch && queryMatch;
    });
  }, [deferredQuery, selectedFaction, selectedRelic]);

  return (
    <div className="wiki-page flex flex-col">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <div className="wiki-badge mb-4">Character Archive</div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="wiki-title">Characters</h1>
              <p className="wiki-subtle mt-3 max-w-2xl">
                Explore the full roster with quick filters for faction, relic type, and keyword
                search.
              </p>
            </div>
            <div className="wiki-panel-solid px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Visible Entries</p>
              <p className="mt-2 text-3xl font-bold text-white">{filteredCharacters.length}</p>
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
              placeholder="Search characters, factions, talents..."
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
            <Users size={18} className="text-cyan-200" />
            <h2 className="text-xl font-bold">Filters</h2>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Faction
            </h3>
            <div className="flex flex-wrap gap-2">
              {factions.map((faction) => (
                <button
                  key={faction}
                  onClick={() => setSelectedFaction(faction)}
                  className={`wiki-chip ${selectedFaction === faction ? "wiki-chip-active" : ""}`}
                >
                  {faction}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Relic Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {relics.map((relic) => (
                <button
                  key={relic}
                  onClick={() => setSelectedRelic(relic)}
                  className={`wiki-chip ${selectedRelic === relic ? "wiki-chip-active" : ""}`}
                >
                  {relic}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="wiki-panel wiki-split-column p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h2 className="wiki-section-title">Roster Index</h2>
              <p className="wiki-subtle mt-2">Current archive entries shown with the selected filters.</p>
            </div>
          </div>

          {filteredCharacters.length > 0 ? (
            <div className="wiki-data-grid mt-5">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character.id} data={character} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/4 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-white">No characters found.</p>
              <p className="mt-2 text-sm text-slate-400">
                Try clearing a filter or using a broader search term.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Character;
