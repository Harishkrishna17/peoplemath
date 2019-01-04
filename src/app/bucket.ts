import { Objective, objectiveResourcesCommitted } from "./objective";

export class Bucket {
  constructor(
    public displayName: string,
    allocationPercentage: number,
    public objectives: Objective[],
  ) {
    this.allocationPercentage = allocationPercentage;
  }

  private _allocationPercentage: number;

  get allocationPercentage(): number {
    return this._allocationPercentage;
  }

  set allocationPercentage(pct: number) {
    this._allocationPercentage = pct >= 0 ? pct : 0;
  }
};

/**
 * Sum of resources committed to the bucket.
 * Not a member function to avoid problems with JSON (de)serialization.
 */
export function bucketResourcesCommitted(bucket: Bucket): number {
  return bucket.objectives
    .map(objectiveResourcesCommitted)
    .reduce((sum, current) => sum + current, 0);
}

