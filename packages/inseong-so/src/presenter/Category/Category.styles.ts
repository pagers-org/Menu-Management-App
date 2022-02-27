import styled from '@emotion/styled';
import { Box as muiBox, ButtonGroup as muiButtonGroup } from '@mui/material';

export const Box = styled(muiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonGroup = styled(muiButtonGroup)`
  margin-top: 32px;
`;
