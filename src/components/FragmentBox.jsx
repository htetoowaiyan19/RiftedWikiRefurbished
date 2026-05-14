import React from "react";
import { DescriptionText } from "./DescriptionText";

const FragmentBox = ({ character }) => {
  const fragments = character.fragments;
  let count = 0;

  return (
    <div className="wiki-entry-stack">
      {fragments.map((fragment, index) => (
        <article key={index} className="wiki-entry">
          <header className="wiki-entry-header">
            <h3 className="wiki-entry-title">
              Fragment {++count} - {fragment.name}
            </h3>
          </header>
          <div className="wiki-entry-body">
            <DescriptionText text={fragment.desc} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default FragmentBox;
