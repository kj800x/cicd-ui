import { BuildCard } from "./BuildCard";
import { Section } from "./Section";
import { OmnibusQuery } from "./gql/graphql";

interface Props {
  recentBuilds: OmnibusQuery["recentBuilds"];
}

export function RecentBuilds({ recentBuilds }: Props) {
  if (recentBuilds.length === 0) {
    return null;
  }

  return (
    <>
      <Section>Recent Builds</Section>
      {recentBuilds.map((build) => {
        return <BuildCard build={build} key={build.id} />;
      })}
    </>
  );
}
