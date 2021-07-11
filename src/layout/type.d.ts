import { PayloadActionCreator } from '@reduxjs/toolkit';
export interface IProps{
  toggleSider: PayloadActionCreator<boolean>;
  collapsed:boolean
}
