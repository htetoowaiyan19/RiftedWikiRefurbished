import React, { useDeferredValue, useMemo, useState } from "react";
import { Compass, Search, Sparkles, Swords, Wand2, X } from "lucide-react";
import { Link } from "react-router-dom";
import DisplaySection from "../components/DisplaySection";
import { DescriptionText } from "../components/DescriptionText";
import { globalSearchItems, normalizeWikiText } from "../js/wiki";

const quickLinks = [
  {
    to: "/characters",
    title: "Character Archive",
    description: "Browse factions, roles, talents, and full combat kits.",
    icon: Swords,
  },
  {
    to: "/relics",
    title: "Relic Codex",
    description: "Compare relic types, passives, and forge scaling.",
    icon: Wand2,
  },
  {
    to: "/gameplay",
    title: "Gameplay Systems",
    description: "Read the rules behind reactions, attributes, and focus.",
    icon: Compass,
  },
];

const typeAccent = {
  Character: "bg-cyan-300/10 text-cyan-100 border-cyan-300/20",
  Relic: "bg-amber-300/10 text-amber-100 border-amber-300/20",
  Matter: "bg-fuchsia-300/10 text-fuchsia-100 border-fuchsia-300/20",
  Gameplay: "bg-emerald-300/10 text-emerald-100 border-emerald-300/20",
};

const Home = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeWikiText(deferredQuery).trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return globalSearchItems
      .filter((item) => item.searchText.includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery]);

  return (
    <div className="wiki-page">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div>
            <div className="wiki-badge mb-4">Polished Game Wiki</div>
            <h1 className="wiki-title max-w-4xl">
              A cleaner, richer archive for Rifted: Beyond the Universe.
            </h1>
            <p className="wiki-subtle mt-4 max-w-3xl text-base">
              Search the whole database, jump between archives, and read formatted descriptions
              without losing the structure of the current site.
            </p>

            <label className="relative mt-6 block max-w-3xl">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search characters, relics, matters, mechanics, effects..."
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

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="wiki-panel-solid p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Archives</p>
              <p className="mt-2 text-3xl font-bold text-white">4</p>
            </div>
            <div className="wiki-panel-solid p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Search Hits</p>
              <p className="mt-2 text-3xl font-bold text-white">{query ? searchResults.length : "..."}</p>
            </div>
            <div className="wiki-panel-solid p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Updated View</p>
              <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-white">
                <Sparkles size={16} className="text-cyan-200" />
                Wiki Refresh
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {quickLinks.map(({ to, title, description, icon: Icon }) => (
          <Link key={to} to={to} className="wiki-card">
            <div className="mb-4 inline-flex rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cyan-100">
              <Icon size={18} />
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          </Link>
        ))}
      </section>

      {normalizedQuery && (
        <section className="wiki-panel mt-8 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="wiki-badge mb-3">Global Search</div>
              <h2 className="wiki-section-title">Results for "{query}"</h2>
              <p className="wiki-subtle mt-2">
                Searching across characters, relics, matter sets, and gameplay systems.
              </p>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {searchResults.map((item) => (
                <Link key={item.id} to={item.route} className="wiki-card">
                  <div
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${typeAccent[item.type]}`}
                  >
                    {item.type}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{normalizeWikiText(item.meta)}</p>
                  <div className="mt-4 text-sm leading-6 text-slate-200">
                    <DescriptionText text={normalizeWikiText(item.description)} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/4 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-white">No results found.</p>
              <p className="mt-2 text-sm text-slate-400">
                Try names, attributes, factions, relic types, or effect keywords like
                "Flame", "Focus", or "Healing Bonus".
              </p>
            </div>
          )}
        </section>
      )}

      <DisplaySection type="character" />
      <DisplaySection type="relic" />
      <DisplaySection type="matter" />
    </div>
  );
};

export default Home;
