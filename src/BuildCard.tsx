import styled from "styled-components";
import { TrackedBuild, TrackedBuildAndRepo } from "./gql/graphql";
import { BuildBrief } from "./ContainerList";

const BuildWrapper = styled.div`
  border: 1px solid black;
  padding: 8px;
  margin: 8px 0px;
`;
const Repo = styled.h3``;

interface Props {
  build: TrackedBuildAndRepo;
}

export function BuildCard({ build }: Props) {
  return (
    <BuildWrapper>
      <Repo>
        {build.repoOwnerName}/{build.repoName}
      </Repo>
      <BuildBrief build={build as TrackedBuild} />
    </BuildWrapper>
  );
}
