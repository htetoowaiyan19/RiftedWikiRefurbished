import React from "react";
import { Link } from "react-router-dom";
import { Cog, Hammer } from "lucide-react";

const UnderMaintainance = () => {
  return (
    <div className="wiki-page flex min-h-full items-center">
      <div className="wiki-hero mx-auto w-full max-w-4xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 text-cyan-100">
          <Cog size={34} />
        </div>
        <div className="wiki-badge mt-6">Work In Progress</div>
        <h1 className="wiki-title mt-4">This archive wing is under maintenance.</h1>
        <p className="wiki-subtle mx-auto mt-4 max-w-2xl text-base">
          We&apos;re still forging this page into the same polished wiki style as the rest of the app.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/15"
          >
            Return Home
          </Link>
          <Link
            to="/gameplay"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
          >
            <Hammer size={16} />
            Explore Gameplay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintainance;
