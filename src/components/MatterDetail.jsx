import React from "react";
import { Link, useParams } from "react-router-dom";
import { Sparkles, Star } from "lucide-react";
import matters from "../data/matters.json";
import { DescriptionText } from "./DescriptionText";
import NotFoundComponent from "./NotFoundComponent";
import { getRarityClassName } from "../js/wiki";

const MatterDetail = () => {
  const { id } = useParams();

  const matter = matters.find((item) => item.id === parseInt(id)) || null;
  const fusions =
    matter?.fusion?.map((fusion) => ({
      ...fusion,
      matter: matters.find((item) => item.id === fusion.fusionSet) || null,
    })) || [];

  if (!matter) {
    return (
      <NotFoundComponent
        params={{ message: "Sorry, no matter found.", route: "/matters", type: "matter", data: matters }}
      />
    );
  }

  const setEntries = [
    { label: "2-Piece Set", text: matter.set2 },
    { label: "4-Piece Set", text: matter.set4 },
    { label: "5-Piece Set", text: matter.set5 },
  ];

  return (
    <div className="wiki-page">
      <section className="wiki-hero p-6 sm:p-8">
        <div className="absolute -right-24 top-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <div className="wiki-badge">Matter Set</div>
            <div className={`flex gap-1 ${getRarityClassName(matter.rarity)}`}>
              {[...Array(matter.rarity)].map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
          <h1 className="wiki-title mt-4">{matter.name}</h1>
          <p className="wiki-subtle mt-3 max-w-2xl text-base">Version {matter.version} archive entry.</p>
        </div>
      </section>

      <section className="wiki-panel mt-8 p-5 sm:p-6">
        <div className="mb-4 border-b border-white/10 pb-4">
          <h2 className="wiki-section-title">Set Bonuses</h2>
        </div>

        <div className="wiki-entry-stack">
          {setEntries.map((entry) => (
            <article key={entry.label} className="wiki-entry">
              <header className="wiki-entry-header">
                <h3 className="wiki-entry-title">{entry.label}</h3>
              </header>
              <div className="wiki-entry-body">
                <DescriptionText text={entry.text} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {fusions.length > 0 && (
        <section className="wiki-panel mt-6 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
            <Sparkles size={18} className="text-cyan-200" />
            <h2 className="wiki-section-title">Fusions</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {fusions.map((fusion) => (
              <article key={`${fusion.name}-${fusion.fusionSet}`} className="wiki-detail-card">
                <h3 className="text-xl font-bold text-white">{fusion.name}</h3>
                <div className="mt-3 text-sm text-slate-300">
                  {fusion.matter ? (
                    <Link
                      to={`/matter/${fusion.matter.id}`}
                      className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-semibold text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/15"
                    >
                      Fusion Set: {fusion.matter.name}
                    </Link>
                  ) : (
                    <span>{fusion.fusionSet}</span>
                  )}
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-200">
                  <DescriptionText text={fusion.set} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MatterDetail;
