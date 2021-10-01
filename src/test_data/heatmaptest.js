import React from "react";
import { setData } from "../utils";
import { Card, Input, Row, Col } from "materialize";
import HeatMapDate from "react-d3-heatmap";
import { TwitterPicker } from "react-color";
import { render } from "react-dom";

const endDate = new Date();
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);
const data = setData(startDate, endDate, 231);
const colors = [];
colors.push({ count: 2, color: "#66ff33" });
colors.push({ count: 3, color: "#99ff33" });
colors.push({ count: 4, color: "#ccff33" });
colors.push({ count: 6, color: "#ffcc00" });
colors.push({ count: 7, color: "#ff9933" });
colors.push({ count: 9, color: "#ff0000" });

const startDisplayData = new Date("2018-10-15T17:41:27");
const endDisplayData = new Date("2019-02-21T23:01:50");

class OneYearHeatMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultColor: "#cdcdcd",
      textDefaultColor: "0",
      rectWidth: 10,
      marginRight: 4,
      marginBottom: 4,
      displayLegend: true,
      backgroundColor: "#fff",
      textColor: "#000",
      radius: 0,
      classnames: [],
      displayYear: false,
      toggleStartDisplayData: false,
      toggleEndDisplayData: false,
      onClick: (d, i) => {
        alert(
          "click \n first parameter :  \n" +
            JSON.stringify(d) +
            "\n\n second parameter : \n" +
            i
        );
      },
      onMouseEnter: (d, i) => {
        console.log(
          "Mouse enters into day number " +
            i +
            " with data : " +
            JSON.stringify(d)
        );
      },
      onMouseLeave: (d, i) => {
        console.log(
          "Mouse leaves outside day number " +
            i +
            " with data : " +
            JSON.stringify(d)
        );
      },
      shouldStartMonday: false,
      monthSpace: 0
    };
  }

  handleClassnamesChange = e => {
    const value = e.target.value;
    const classnames = Array.from(this.state.classnames);
    if (e.target.checked) {
      classnames.push(value);
      this.setState({
        classnames: classnames
      });
    } else {
      classnames.splice(classnames.indexOf(value), 1);
      this.setState({
        classnames: classnames
      });
    }
  };

  render() {
    const {
      defaultColor,
      textDefaultColor,
      rectWidth,
      marginRight,
      marginBottom,
      displayLegend,
      backgroundColor,
      textColor,
      radius,
      classnames,
      displayYear,
      shouldStartMonday,
      monthSpace,
      onClick,
      onMouseEnter,
      onMouseLeave,
      toggleStartDisplayData,
      toggleEndDisplayData
    } = this.state;

    const rangeDisplayData = [
      toggleStartDisplayData ? startDisplayData : null,
      toggleEndDisplayData ? endDisplayData : null
    ];

    return (
      <div title="heatmap date with one year data">
        <HeatMapDate
          startDate={startDate}
          endDate={endDate}
          data={data}
          colors={colors}
          defaultColor={defaultColor}
          textDefaultColor={textDefaultColor}
          rectWidth={rectWidth}
          marginBottom={marginBottom}
          marginRight={marginRight}
          displayLegend={displayLegend}
          displayYear={displayYear}
          backgroundColor={backgroundColor}
          textColor={textColor}
          radius={radius}
          classnames={classnames.join(" ")}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          shouldStartMonday={shouldStartMonday}
          monthSpace={monthSpace}
          rangeDisplayData={rangeDisplayData}
        />
        {/* <Row className="topOffset">
          <Col s={4}>
            Display Legend (displayLegend)
            <Input
              type="switch"
              checked={displayLegend}
              onChange={e => {
                this.setState({ displayLegend: e.target.checked });
              }}
            />
            <br />
            Display Year (displayYear)
            <Input
              type="switch"
              checked={displayYear}
              onChange={e => {
                this.setState({ displayYear: e.target.checked });
              }}
            />
            <br />
            Starts on Monday (shouldStartMonday)
            <Input
              type="switch"
              checked={shouldStartMonday}
              onChange={e => {
                this.setState({ shouldStartMonday: e.target.checked });
              }}
            />
            <br />
            Data begins to display from 2018/10/15
            <Input
              type="switch"
              checked={toggleStartDisplayData}
              onChange={e => {
                this.setState({ toggleStartDisplayData: e.target.checked });
              }}
            />
            <br />
            Data ends to display until 2019/02/21
            <Input
              type="switch"
              checked={toggleEndDisplayData}
              onChange={e => {
                this.setState({ toggleEndDisplayData: e.target.checked });
              }}
            />
          </Col>
          <Col s={4}>
            <div style={{ width: "80%" }} className="align-center">
              <p class="range-field">
                Rect width (rectwidth)
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={rectWidth}
                  onChange={e => {
                    this.setState({ rectWidth: parseInt(e.target.value) });
                  }}
                />
              </p>
              <p class="range-field">
                Margin Bottom (marginBottom)
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={marginBottom}
                  onChange={e => {
                    this.setState({ marginBottom: parseInt(e.target.value) });
                  }}
                />
              </p>
              <p class="range-field">
                Margin Right (marginRight)
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={marginRight}
                  onChange={e => {
                    this.setState({ marginRight: parseInt(e.target.value) });
                  }}
                />
              </p>
              <p class="range-field">
                Square radius (radius)
                <input
                  type="range"
                  min="0"
                  max={rectWidth.toString()}
                  value={radius}
                  onChange={e => {
                    this.setState({ radius: parseInt(e.target.value) });
                  }}
                />
              </p>
              <p class="range-field">
                Space between month (monthSpace)
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={monthSpace}
                  onChange={e => {
                    this.setState({ monthSpace: parseInt(e.target.value) });
                  }}
                />
              </p>
            </div>
          </Col>
          <Col s={4}>
            Custom class attributes
            <Row>
              <Input
                name="classnames"
                type="checkbox"
                value="redBorder"
                label="Red Border"
                onChange={this.handleClassnamesChange}
              />
              <Input
                name="classnames"
                type="checkbox"
                value="shadow"
                label=" Container Shadow"
                onChange={this.handleClassnamesChange}
              />
            </Row>
            Text default color in legend (textDefaultColor)
            <Row>
              <Input
                type="text"
                onChange={e =>
                  this.setState({ textDefaultColor: e.target.value })
                }
                value={textDefaultColor}
              />
            </Row>
            Square default color (defaultColor)
            <br />
            <br />
            <TwitterPicker
              color={defaultColor}
              onChange={color => this.setState({ defaultColor: color.hex })}
            />
            <br />
            Text color (textColor)
            <br />
            <br />
            <TwitterPicker
              color={textColor}
              onChange={color => this.setState({ textColor: color.hex })}
            />
            <br />
            Background color (textColor)
            <br />
            <br />
            <TwitterPicker
              color={backgroundColor}
              onChange={color => this.setState({ backgroundColor: color.hex })}
            />
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default OneYearHeatMap;