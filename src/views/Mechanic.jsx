import React, { useDeferredValue, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import mechanics from "../data/mechanics.json";
import { DescriptionText } from "../components/DescriptionText";
import { getMechanicTag, normalizeWikiText } from "../js/wiki";

const Mechanic = () => {
  const [query, setQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = normalizeWikiText(deferredQuery).trim().toLowerCase();
  const filteredMechanics = mechanics.filter((mechanic) => {
    const title = normalizeWikiText(mechanic.title).toLowerCase();
    const desc = normalizeWikiText(mechanic.desc).toLowerCase();
    const fullDesc = normalizeWikiText(mechanic.fullDesc).toLowerCase();

    return (
      normalizedQuery.length === 0 ||
      title.includes(normalizedQuery) ||
      desc.includes(normalizedQuery) ||
      fullDesc.includes(normalizedQuery)
    );
  });

  return (
    <div className="wiki-page">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="wiki-badge mb-4">Gameplay Archive</div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="wiki-title max-w-4xl">
                Learn the systems behind every Rifted match.
              </h1>
              <p className="wiki-subtle mt-3 max-w-3xl text-base">
                Browse core rules, attributes, reactions, and combat systems with formatted
                descriptions and searchable entries.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="wiki-panel-solid p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Total Entries</p>
                <p className="mt-2 text-3xl font-bold text-white">{mechanics.length}</p>
              </div>
              <div className="wiki-panel-solid p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Search Results</p>
                <p className="mt-2 text-3xl font-bold text-white">{filteredMechanics.length}</p>
              </div>
            </div>
          </div>

          <label className="relative mt-6 block max-w-3xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search mechanics, effects, or keywords..."
              className="wiki-input pl-11 pr-12"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </section>

      <section className="wiki-panel mt-8 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="wiki-section-title">Mechanics</h2>
            <p className="wiki-subtle mt-2">Expandable descriptions keep dense rules readable.</p>
          </div>
        </div>

        {filteredMechanics.length > 0 ? (
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {filteredMechanics.map((mechanic, index) => {
              const title = normalizeWikiText(mechanic.title);
              const desc = normalizeWikiText(mechanic.desc);
              const fullDesc = normalizeWikiText(mechanic.fullDesc);
              const cardKey = `${title}-${index}`;
              const isExpanded = expandedCard === cardKey;

              return (
                <article
                  key={cardKey}
                  className="wiki-card rounded-[1.75rem] p-5 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="wiki-badge">{getMechanicTag(title)}</div>
                      <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
                    </div>
                    <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 sm:block">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="mt-4 text-sm leading-6 text-slate-200">
                    <DescriptionText text={desc} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedCard(isExpanded ? null : cardKey)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                  >
                    {isExpanded ? "Hide details" : "Read full description"}
                    <ChevronDown size={16} className={`transition ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/15 p-4 text-sm leading-6 text-slate-200">
                      <DescriptionText text={fullDesc} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/4 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-white">No mechanics match "{query}".</p>
            <p className="mt-2 text-sm text-slate-400">
              Try a different keyword like "Focus", "Flame", or "Technology".
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Mechanic;
