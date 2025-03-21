import React, { useState } from "react";
import Cards from "../Cards";

const CompletedTasks: React.FC = () => {
  const [visibility, setVisibility] = useState<"hidden" | "fixed">("hidden");

  return (
    <div>
      <Cards home="false" setVisibility={setVisibility} />
    </div>
  );
};

export default CompletedTasks;
