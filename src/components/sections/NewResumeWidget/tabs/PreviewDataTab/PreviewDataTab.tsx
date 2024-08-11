// PreviewDataTab.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";
import { EmployeeResumeWidget } from "../../../../widgets/employee";


export const PreviewDataTab: React.FC = () => {
  const navigate = useNavigate();
  const resumeContext = useResume();

  if (!resumeContext) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    console.log("Resume submitted:", resumeContext.resumeData);
    navigate("/resume-submitted");
  };

  return (
    <EmployeeResumeWidget
      resumeData={resumeContext.resumeData as any}
      onBack={() => navigate("/create-resume/params")}
      onSubmit={handleSubmit}
      isInTab={true}
    />
  );
};
