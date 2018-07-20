import React, { Component } from "react";
import { connect } from "react-redux";
import LayoutContentWrapper from "../components/utility/layoutWrapper";
import LayoutContent from "./layoutContent";
import Numbers from "../components/atm/numbers";
import { Card, Input, Row, Col, Button, message } from "antd";
import atmPic from "../image/icons/atm.jpg";
import notification from "../components/notification";
import JwtAuthentication from "../helpers/jwtAuthentication";

const billetes = [];

class ATM extends Component {
  constructor(props) {
    super(props);
    this.billetestr = [<div>Tome su efectivo </div>];
    this.state = {
      billetestr: this.billetestr,
      loading: false,
      iconLoading: false,
      inputMonto: "",
      disabledInput: false,
      colsCash:{display: 'none'}
    };
  }
  enterLoading = () => {
    this.setState({ loading: true });
  };
  separa = (monto, billetes, inicio) => {
    if (inicio == -1) {
      inicio = billetes.length - 1;
      if (monto % 10 > 0) return monto;
    }
    billetes[inicio].cantidad = parseInt(monto / billetes[inicio].denominacion);
    let residuo = monto % billetes[inicio].denominacion;
    while (residuo > 0) {
      let ninicio = inicio;
      ninicio--;
      if (inicio > 1) {
        residuo = this.separa(residuo, billetes, ninicio);
      }
      if (residuo > 0 && billetes[inicio].cantidad == 0) {
        break;
      }
      if (residuo > 0 && billetes[inicio].cantidad > 0) {
        billetes[inicio].cantidad--;
        residuo =
          monto - billetes[inicio].denominacion * billetes[inicio].cantidad;
      }
    }
    return residuo;
  };
  calculaMonto = () => {
    if (this.state.inputMonto !== "" && this.state.inputMonto !== "0") {
      //^\d{1,45}$
      this.setState({colsCash:{marginBottom: '16px'}});
      billetes[1] = { denominacion: 20, cantidad: 0 };
      billetes[2] = { denominacion: 50, cantidad: 0 };
      billetes[3] = { denominacion: 100, cantidad: 0 };
      billetes[4] = { denominacion: 200, cantidad: 0 };
      this.setState({ loading: true, disabledInput: true });
      let monto = this.state.inputMonto;
      if (this.separa(monto, billetes, -1) > 0) {
        message.error(
          "No es posible obtener billetes con un monto de  " +
            monto +
            " en billetes de 200, 100, 50 o 20 con los que cuenta el cajero"
        );
      } else {
        let cadena = "Solución:";
        let billetestr = "";
        for (let i = 1; i < billetes.length; i++) {
          billetes[i].cantidad > 0
            ? (cadena +=
                "\n  Billetes de S/." +
                billetes[i].denominacion +
                "\t: " +
                billetes[i].cantidad)
            : (cadena += "");
          for (let j = 0; j < billetes[i].cantidad; j++) {
            this.billetestr.push(
              <Col md={8} sm={8} xs={8} style={this.colStyle}>
                <div className="ant-billete">
                  <div className="ant-billete-legend">
                    {billetes[i].denominacion}
                  </div>
                </div>
              </Col>
            );
          }
        }
        console.log(cadena);
        console.log(billetes);
      }
    } else {
      message.warning("Introduce el monto deseado");
    }
  };
  valueButtons = event => {
    let value = event.target.innerText;
    console.log("valueButtons", event.target.innerText);
    let newNumber = this.state.inputMonto;
    if (this.state.inputMonto == "") {
      newNumber = value;
    } else {
      newNumber = this.state.inputMonto + value;
    }
    console.log(newNumber);
    this.setState({ inputMonto: newNumber });
  };
  cancelButton = event => {
    this.billetestr = [<div>Tome su efectivo </div>];
    this.setState({
      loading: false,
      disabledInput: false,
      inputMonto: "",
      billetestr: this.billetestr,
      colsCash:{display: 'none'}
    });
  };
  render() {
    const rowStyle = {
      width: "98.9%",
      display: "flex",
      flexFlow: "row wrap"
    };
    const colStyle = {
      marginBottom: "16px"
    };
    const inline = {
      float: "left"
    };
    const gutter = 16;
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <div className="ant-card-head">
                <img alt="user" src={atmPic} width="64px" style={inline} />
                <h3 style={inline}>ATM</h3>
              </div>
              <Col md={24} sm={24} xs={24} style={colStyle}>
                <Input
                  value={this.state.inputMonto}
                  placeholder="0"
                  size="large"
                  disabled={this.state.disabledInput}
                  onChange={event =>
                    this.setState({ inputMonto: event.target.value })
                  }
                  onKeyDown={event =>
                    event.key === "Enter" ? this.calculaMonto() : null
                  }
                />
              </Col>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Numbers
              valueButtons={this.valueButtons}
              inputMonto={this.state.inputMonto}
              calculaMonto={this.calculaMonto}
              cancelButton={this.cancelButton}
            />
          </Row>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={this.state.colsCash}>
              {this.state.billetestr}
            </Col>
          </Row>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
export default connect(
  state => ({
    idToken: state.Auth.toJS().idToken
  }),
  {}
)(ATM);
