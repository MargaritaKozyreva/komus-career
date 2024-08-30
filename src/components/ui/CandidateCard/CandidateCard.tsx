// CandidateCard.tsx
import React from "react";
import { CandidateType } from "../../../types/candidates";
import styles from "./CandidateCard.module.scss";
import { Link } from "react-router-dom";

interface CandidateCardProps {
  candidate: CandidateType;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className={styles.card}>
      <h3>{candidate.userFullname}</h3>
      <img src={candidate.userAvatar} alt={candidate.userFullname} />
      <p className={styles.position}>
        <Link to={`/employee-resume/${candidate.id}`}>
          {candidate.userPositionName}
        </Link>
      </p>
      <p className={styles.description}>{candidate.description}</p>
    </div>
  );
};
