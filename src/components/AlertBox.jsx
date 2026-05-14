import React from "react";
import { AlertCircle } from "lucide-react";

const AlertBox = ({ params }) => {
  return (
    <div className="wiki-panel my-6 border-cyan-300/15 bg-cyan-300/10 p-4">
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-100">
          <AlertCircle size={16} />
        </div>
        <div className="text-sm leading-6 text-slate-200">
          {params.title && <span className="mr-1 font-semibold text-white">{params.title}</span>}
          <span>{params.message || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
