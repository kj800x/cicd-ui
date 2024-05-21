import styled from "styled-components";

const CommitSha = styled.div`
  font-family: monospace;
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: #6e768166;
  border-radius: 6px;
  // text-decoration: underline;
  // text-underline-offset: .2rem;
  display: inline-block;
}

`;

interface Props {
  sha: string;
}

export function Commit({ sha }: Props) {
  // first 7 characters of the sha
  sha = sha.substring(0, 7);

  return <CommitSha>{sha}</CommitSha>;
}
