import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { ButtonAtm } from './button.style';
const Buttonatm = ButtonAtm(Button);
export default class Numbers extends Component {

  render() {
    const rowStyle = {
      width: '98.9%',
      display: 'flex',
      flexFlow: 'row wrap',
    };
    const colStyle = {
      marginBottom: '16px',
    };
    const colStyleEdit = {
      marginBottom: '-8px!important',
    };
    const inline = {
      float:'left'
    };
    const gutter = 16;
    return (
        <Col md={12} sm={24} xs={24} style={colStyleEdit}>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="1">1</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="2">2</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="3">3</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="4">4</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="5">5</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="6">6</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="7">7</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="8">8</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="9">9</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.cancelButton(event)} type="danger" shape="circle" value="X">X</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.valueButtons(event)} type="primary" shape="circle" value="0">0</Buttonatm>
          </Col>
          <Col md={8} sm={8} xs={8} style={colStyle}>
            <Buttonatm onClick = {event => this.props.calculaMonto()} type="primary" shape="circle" value="v/">v/</Buttonatm>
          </Col>
          
        </Col>
    );
  }
}
