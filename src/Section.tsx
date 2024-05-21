import React from "react";
import styled from "styled-components";

const SectionInner = styled.h2`
  margin-top: 8px;
  border-bottom: 1px solid blue;
`;
export function Section({ children }: { children: React.ReactNode }) {
  return <SectionInner>{children}</SectionInner>;
}
