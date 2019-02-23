import React, { Component } from "react";
import { Stage, withPixiApp } from "@inlet/react-pixi";
import * as paper from "../../node_modules/paper/dist/paper-full";
import * as PIXI from "pixi.js";
import { Color } from "paper";
// import { PaperScope } from 'paper'

const padStyles = {
  position: "absolute",
  zIndex: "1"
};

const Styles = {
  PadContainer: {
    display: "flex",
    width: "100vw",
    height: "60vh",
    alignItems: "center",
    justifyContent: "center"
  }
};

class Pad extends Component {
  constructor(props) {
    super(props);
    this.paperCanvas = null;
    this.App = null;
    this.state = {
      currentBackground: "",
      submissionURL: "",
    };
    this.history = [];
    this.historyIndex = 1;
  }

  componentDidMount() {
    this.App = new PIXI.Application(800, 600, {
      backgroundColor: "0xffffff",
      view: this.App
    });

    // var canvas = document.getElementById("paper")
    paper.setup(this.paperCanvas);
    let myPath;
    let drawing = false;

    paper.view.onMouseDown = event => {
      drawing = true;
      myPath = new paper.Path();
      myPath.strokeColor = "black";
      myPath.strokeWidth = 2;
      this.history.push(myPath);
    };

    paper.view.onMouseDrag = event => {
      if (drawing === true) myPath.add(event.point);
    };

    paper.view.draw();
  }

  render() {
    return (
      <div className="pad-container">
        <div className="button-list">
          <button
            className="menu-item"
            onClick={e => {
              if (this.historyIndex === this.history.length - 1) {
                this.history[
                  this.history.length - this.historyIndex
                ].strokeColor = new Color(0, 0, 0, 0);
              } else {
                this.history[
                  this.history.length - this.historyIndex++
                ].strokeColor = new Color(0, 0, 0, 0);
              }
            }}
          >
            Undo
          </button>
          <button
            className="menu-item"
            onClick={e => {
              if (this.historyIndex === 1) {
                this.history[
                  this.history.length - this.historyIndex
                ].strokeColor = new Color(0, 0, 0, 1);
              } else {
                this.history[
                  this.history.length - --this.historyIndex
                ].strokeColor = new Color(0, 0, 0, 1);
              }
            }}
          >
            Redo
          </button>
          <button
            className="menu-item"
            onClick={e => {
              this.history.map(ee => {
                return ee.remove();
              });
            }}
          >
            Clear
          </button>

          <button
            className="menu-item"
            onClick={e => {
              this.setState({ submissionURL: this.paperCanvas.toDataURL() });
              console.log(this.state.submissionURL);
            }}
          >
            <a
              className="menu-item"
              href={this.state.submissionURL}
              download="submission.png"
            >
              Submit
            </a>
          </button>
        </div>
        <div style={Styles.PadContainer}>
          <div className="pad-box">
            <canvas
              style={padStyles}
              id="paper"
              width={800}
              height={600}
              ref={c => (this.paperCanvas = c)}
            />
            <canvas id="pixi" style={{ zIndex: 0 }} ref={c => (this.App = c)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Pad;
