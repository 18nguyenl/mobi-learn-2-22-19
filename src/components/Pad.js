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
      history: [],
      historyIndex: 0,
    };
    this.history= []
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

    paper.view.onMouseUp = event => {
      // let background = PIXI.Sprite.from(PIXI.Texture.from(this.paperCanvas));
      // background.width = this.App.screen.width;
      // background.height = this.App.screen.height;
      // this.App.stage.addChild(background);
      // this.state.history.push(PIXI.Texture.from(this.paperCanvas));
      // drawing = false;
    };

    paper.view.draw();
  }

  render() {
    return (
      <div className="pad-container">
        <div className="button-list">
          <button className="menu-item" onClick={
            e => {
              if(this.historyIndex === 0) {
                // this.history[0].strokeColor=Color(0, 0, 0, 0);
                this.history[this.history.length-this.historyIndex].strokeColor='white';
              }
              else {
                // this.history[this.historyIndex].strokeColor=Color(0,0,0,0)
                this.history[this.history.length-this.historyIndex++].strokeColor='white'
                // this.setState()
              } 
              console.log(this.history)
            }
          }>Undo</button>
          <button className="menu-item">Redo</button>
          <button className="menu-item">Clear</button>
          <a className="menu-item" href={this.state.submissionURL} download="submission.png">
            <button
              onClick={e => {
                this.setState({submissionURL: this.paperCanvas.toDataURL()});
                console.log(this.state.submissionURL)
              }}
            >
              Submit
            </button>
          </a>
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
