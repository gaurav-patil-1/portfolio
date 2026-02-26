import styled from "styled-components";

export const Container = styled.div`
  width: min(${({ theme }) => theme.typography.maxWidth}, calc(100% - 2rem));
  margin: 0 auto;
`;