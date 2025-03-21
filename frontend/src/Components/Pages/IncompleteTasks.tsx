import React, { useState } from "react";
import Cards from "../Cards";

const IncompleteTasks: React.FC = () => {
  const [visibility, setVisibility] = useState<"hidden" | "fixed">("hidden");

  return (
    <div>
      <Cards home="false" setVisibility={setVisibility} />
    </div>
  );
};

export default IncompleteTasks;
