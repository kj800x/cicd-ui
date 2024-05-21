import styled from "styled-components";
import { Section } from "./Section";
import { OmnibusQuery, TrackedBuild } from "./gql/graphql";
import { FeStatus, getStatus, sortByStatus } from "./feStatus";
import { Commit } from "./Commit";
import { FormattedTime } from "./FormattedTime";

type BuildStatus = "None" | "Pending" | "Success" | "Failure";

const ContainerCardWrapper = styled.div`
  border: 1px solid blue;
  margin: 8px;
  padding: 8px;
`;
const ContainerName = styled.h3``;
const ContainerStatus = styled.div<{ status: FeStatus }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "up-to-date":
        return "green";
      case "out-of-date":
        return "goldenrod";
      case "not-tracked":
        return "darkred";
      case "not-first-party":
        return "grey";
    }
  }};
  border-radius: 100%;
  height: 20px;
  width: 20px;
  margin: 1px;
  display: inline-block;
`;
const ContainerStatusText = styled.span`
  margin-left: 8px;
`;
const Builds = styled.div`
  display: flex;
`;
const Build = styled.div`
  flex: 1;
  margin: 8px;
`;
const BuildLabel = styled.div`
  font-weight: bold;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
`;
const BuildStatusText = styled.a`
  margin-left: 8px;
`;
const BuildStatus = styled.div<{ status: BuildStatus }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "None":
        return "grey";
      case "Pending":
        return "goldenrod";
      case "Success":
        return "green";
      case "Failure":
        return "red";
    }
  }};

  ${(props) =>
    props.status === "Pending"
      ? `
        @keyframes pulse {
          0% {
            opacity: 100%;
          }
          50% {
            opacity: 25%;
          }
        }
        animation: pulse 1.3s infinite;
        animation-timing-function: ease-in-out;`
      : ""}

  border-radius: 100%;
  height: 20px;
  width: 20px;
  margin: 8px 0px;
  display: inline-block;
`;

export function BuildBrief({
  build,
}: {
  build: TrackedBuild | undefined | null;
}) {
  if (!build) {
    return <i>unknown</i>;
  }

  return (
    <span>
      <Status>
        <BuildStatus status={build.buildStatus as BuildStatus} />
        <BuildStatusText
          as={!build.buildUrl ? "span" : "a"}
          href={build.buildUrl || ""}
        >
          {build.buildStatus}
        </BuildStatusText>
      </Status>
      <Commit sha={build.sha} /> <FormattedTime ts={build.timestamp} /> <br />
      {build.message}
    </span>
  );
}

interface Props {
  machine: OmnibusQuery["machines"][0];
}

function ContainerCard({
  container,
}: {
  container: OmnibusQuery["machines"][0]["containers"][0] & {
    status: FeStatus;
  };
}) {
  return (
    <ContainerCardWrapper id={container.name}>
      <ContainerName>{container.name}</ContainerName>
      <b>{container.state}</b>
      <br />
      <i>{container.imageDescriptor}</i>
      <Status>
        <ContainerStatus status={container.status} />
        <ContainerStatusText>{container.status}</ContainerStatusText>
      </Status>
      {container.currentBuild || container.latestBuild ? (
        <Builds>
          <Build>
            <BuildLabel>Current</BuildLabel>
            <BuildBrief build={container.currentBuild} />
          </Build>
          <Build>
            <BuildLabel>Latest</BuildLabel>
            <BuildBrief build={container.latestBuild} />
          </Build>
        </Builds>
      ) : null}
    </ContainerCardWrapper>
  );
}

export function ContainerList({ machine }: Props) {
  const containersWithStatus = machine.containers
    .map((container) => ({
      ...container,
      status: getStatus(container),
    }))
    .sort(sortByStatus);

  return (
    <>
      <Section>Details: {machine.name}</Section>
      {containersWithStatus.map((container) => {
        return <ContainerCard key={container.id} container={container} />;
      })}
    </>
  );
}
