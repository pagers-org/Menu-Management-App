import * as mui from '@mui/material';
import styled from '@emotion/styled';

export const MenuListWrapper = styled(mui.Box)`
  margin-top: 32px;
  width: 700px;
  background-color: white;
  padding: 3em;
  border-radius: 15px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%); ;
`;

export const MenuListTitleWrapper = styled(mui.Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Paper = styled(mui.Paper)`
  margin-top: 16px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

export const InputBase = styled(mui.InputBase)`
  margin-left: 8px;
  flex: 1;
`;

export const Divider = styled(mui.Divider)`
  height: 28px;
  margin: 4px;
`;

export const IconButton = styled(mui.IconButton)`
  padding: 10px;
`;
