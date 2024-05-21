import { OmnibusQuery } from "./gql/graphql";

export type FeStatus =
  | "up-to-date"
  | "out-of-date"
  | "not-tracked"
  | "not-first-party";

const STATUS_ORDER: Record<FeStatus, number> = {
  "up-to-date": 0,
  "out-of-date": 1,
  "not-tracked": 2,
  "not-first-party": 3,
};

export function sortByStatus(
  a: { status: FeStatus },
  b: { status: FeStatus }
): number {
  return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
}

export function getStatus(
  container: OmnibusQuery["machines"][0]["containers"][0]
): FeStatus {
  if (container.latestBuild) {
    if (
      container.currentBuild &&
      container.latestBuild.sha === container.currentBuild.sha
    ) {
      return "up-to-date";
    }
    return "out-of-date";
  }

  if (!container.isFirstParty) {
    return "not-first-party";
  } else {
    return "not-tracked";
  }
}
