export type CandidateType = {
  id: string;
  userId: string;
  userFullname: string;
  userAvatar: string;
  userPositionName: string;
  userPositionId: string;
  salaryRange: string;
  postedDate: string;
  isStarred?: boolean;
  description: string;
  contractType: string;
  url: string;
};

export type CandidatesDataType = {
  data: CandidateType[];
};
