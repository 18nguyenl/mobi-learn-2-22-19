import React, { Component } from "react";
import { Stage, withPixiApp } from "@inlet/react-pixi";
import * as paper from "../../node_modules/paper/dist/paper-full";
import * as PIXI from "pixi.js";
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
      history: [],
      currentBackground: ""
    };
  }

  componentDidMount() {
    this.App = withPixiApp(this);
    // var canvas = document.getElementById("paper")
    paper.setup(this.paperCanvas);
    let myPath;
    let drawing = false;
    paper.view.onMouseDown = event => {
      drawing = true;
      myPath = new paper.Path();
      myPath.strokeColor = "black";
      myPath.strokeWidth = 2;
    };

    paper.view.onMouseDrag = event => {
      if (drawing === true) myPath.add(event.point);
    };

    paper.view.onMouseUp = event => {
        let background = PIXI.Sprite.from(PIXI.Texture.from(this.paperCanvas));
        background.width = this.App.screen.width;
        background.height = this.App.screen.height;
        this.App.stage.addChild(background);
        this.state.history.push(PIXI.Texture.from(this.paperCanvas));
        drawing = false;
    };

    paper.view.draw();
  }

  render() {
    return (
      <div className="pad-container">
        <div className="button-list">
          <button>Undo</button>
          <button>Redo</button>
          <button>Clear</button>
          <button>Submit</button>
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
            <Stage
              width={800}
              height={600}
              options={{ antialias: true, backgroundColor: "0xffffff" }}
              style={{ zIndex: -1 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pad;
