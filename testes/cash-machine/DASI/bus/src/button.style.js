import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  transition,
  borderRadius,
  boxShadow,
} from '../config/style-util';

const ButtonAtm = ComponentName => styled(ComponentName)`
  .ant-card-head {
    padding: 0px 0px!important;
    background-color: #d8d8d8!important;
    line-height: 65px!important;
    height: 64px !important;
  }

 .ant-card-head > div > div > h3{
    padding-left: 7px !important;
    font-size: 39px !important;
  }

  
  
`;



export { ButtonAtm };
