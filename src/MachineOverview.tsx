import styled from "styled-components";
import { Section } from "./Section";
import { OmnibusQuery } from "./gql/graphql";
import { FeStatus, getStatus, sortByStatus } from "./feStatus";

interface Props {
  machine: OmnibusQuery["machines"][0];
}

const StatusDot = styled.a<{ status: FeStatus }>`
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

export function MachineOverview({ machine }: Props) {
  const containersWithStatus = machine.containers
    .map((container) => ({
      ...container,
      status: getStatus(container),
    }))
    .sort(sortByStatus);

  return (
    <>
      <Section>Overview: {machine.name}</Section>
      {containersWithStatus.map((container) => {
        return (
          <StatusDot
            key={container.id}
            status={container.status}
            title={container.name}
            href={`#${container.name}`}
          />
        );
      })}
    </>
  );
}
