import styled from 'styled-components';
import { palette } from 'styled-theme';
import cash from '../image/icons/business.png';

const LayoutContent = styled.div`
  width: 100%;
  padding: 35px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  height: 100%;

  .ant-card-head {
    padding: 0px 0px!important;
    background-color: #d8d8d8!important;
    line-height: 65px!important;
    height: 64px !important;
  }
  .ant-card-head > h3{
    padding-left: 7px !important;
    font-size: 39px !important;
  }

  .ant-input-lg{
    font-family: Orbitron !important;
    height: 80px!important;
    font-size: 56px !important;
    margin-top: 25px !important;
    width: 40% !important;
  }
  div.ant-billete{
    background-image:url(${cash});
    background-repeat: no-repeat;
    height: 100px;
  }
  div.ant-billete-legend{
    font-family: Orbitron !important;
    line-height: 42px!important;
    background-color: #84be55!important;
    color: black;
    width: 72px;
    height: 35px;
    padding-top: -8px;
    margin-left: 27px;
    margin-top: 46px;
    position: absolute;
    font-size: 29px;
  }
`;

export default LayoutContent;


  



