import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Radar } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="wiki-page flex min-h-full items-center">
      <div className="wiki-hero mx-auto w-full max-w-4xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 text-cyan-100">
          <Radar size={34} />
        </div>
        <div className="wiki-badge mt-6">404 Signal Lost</div>
        <h1 className="wiki-title mt-4">This page isn&apos;t in the archive.</h1>
        <p className="wiki-subtle mx-auto mt-4 max-w-2xl text-base">
          The route you followed doesn&apos;t match any registered wiki entry right now.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/15"
          >
            <ArrowLeft size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
