import { useQuery } from "@apollo/client";
import { graphql } from "./gql";
import { Header } from "./Header";
import { RecentBuilds } from "./RecentBuilds";
import { MachineOverview } from "./MachineOverview";
import { ContainerList } from "./ContainerList";
import { OmnibusQuery } from "./gql/graphql";

const OMNIBUS = graphql(`
  query omnibus {
    machines {
      url
      id
      name
      containers {
        id
        imageDescriptor
        image {
          id
          labels
        }
        name
        state
        isFirstParty
        isRepoTracked
        latestBuild {
          id
          buildStatus
          buildUrl
          sha
          message
          timestamp
        }
        currentBuild {
          id
          buildStatus
          sha
          message
          timestamp
          buildUrl
        }
      }
    }
    recentBuilds {
      id
      buildStatus
      sha
      message
      timestamp
      buildUrl
      repoName
      repoOwnerName
    }
  }
`);

/*
Page design:
- Header
- Active builds (if any)
- For each machine:
  - Machine name
  - Container overview (up-to-date, out-of-date, not tracked, not first-party)
    - Tooltip with container name
    - Link to full container card
- For each machine:
  - Full container cards for any out-of-date containers
  - Full container cards for any not tracked containers
  - Full cards for up-to-date containers
  - Full cards for not first-party containers=
*/
export function HomePage() {
  const { loading, error, data } = useQuery(OMNIBUS, { pollInterval: 1000 });

  if (error) return <p>Error :(</p>;
  if (loading || !data) return <p>Loading...</p>;

  return (
    <div className="App">
      <Header />
      <div className="content">
        <RecentBuilds recentBuilds={data.recentBuilds} />
        {data.machines.map((machine: OmnibusQuery["machines"][0]) => (
          <MachineOverview machine={machine} />
        ))}
        {data.machines.map((machine: OmnibusQuery["machines"][0]) => (
          <ContainerList machine={machine} />
        ))}
      </div>
    </div>
  );
}
