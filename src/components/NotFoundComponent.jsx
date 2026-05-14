import React from "react";
import { ArrowLeft, Shuffle, TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundComponent = ({ params }) => {
  const navigate = useNavigate();

  const handleRandom = () => {
    if (!params.data || params.data.length === 0) return;

    const randomIndex = Math.floor(Math.random() * params.data.length);
    const item = params.data[randomIndex];
    navigate(`/${params.type}/${item.id}`);
  };

  return (
    <div className="wiki-page flex min-h-full items-center">
      <div className="wiki-hero mx-auto w-full max-w-4xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-amber-300/15 bg-amber-300/10 text-amber-100">
          <TriangleAlert size={34} />
        </div>
        <div className="wiki-badge mt-6">Missing Entry</div>
        <h1 className="wiki-title mt-4">That archive record couldn&apos;t be found.</h1>
        <p className="wiki-subtle mx-auto mt-4 max-w-2xl text-base">{params.message}</p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to={params.route}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 font-semibold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/15"
          >
            <ArrowLeft size={16} />
            Return
          </Link>
          <button
            onClick={handleRandom}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
          >
            <Shuffle size={16} />
            Random {params.type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
