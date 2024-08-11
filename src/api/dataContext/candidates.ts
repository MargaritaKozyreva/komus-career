import { CandidatesDataType } from "../../types/candidates";
import { ResponseResult, httpService } from "../service/service";

export class CandidatesData {
  getCandidates(searchQuery?: string): ResponseResult<CandidatesDataType> {
    const endpoint = `get_candidates&query=${encodeURIComponent(searchQuery as string) || undefined}`
    const data = httpService<CandidatesDataType>("GET", endpoint);
    return data;
  }

  addCandidateInFavorite(payload: {
    candidateId: string;
  }): ResponseResult<CandidatesDataType> {
    const data = httpService<CandidatesDataType>(
      "GET",
      "add_candidate_in_favorite",
      `candidate_id=${payload.candidateId}`
    );
    return data;
  }
}
