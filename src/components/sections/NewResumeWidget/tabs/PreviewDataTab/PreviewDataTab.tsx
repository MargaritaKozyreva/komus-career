import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResume } from "../../../../../entities/NewResume/ResumeContext";
import { EmployeeResumeWidget } from "../../../../widgets/employee";

export const PreviewDataTab: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const resumeContext = useResume();

  if (!resumeContext) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    if (id) {
      navigate(`/edit-resume/${id}/params`);
    } else {
      navigate("/create-resume/params");
    }
  };

  const handleSubmit = () => {
    console.log("Resume submitted:", resumeContext.resumeData);
    navigate("/resume-submitted");
  };

  return (
    <EmployeeResumeWidget
      resumeData={resumeContext.resumeData as any}
      onBack={handleBack}
      onSubmit={handleSubmit}
      isInTab={true}
    />
  );
};
