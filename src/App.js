import React, { Component } from 'react';
import { injectGlobal } from 'styled-components'
import ShinyButton from './components/ShinyButton';

// eslint-disable-next-line
injectGlobal`
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #71AFDF;
    color: #fff;
    font-family: sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`

const colors = [
  '#108FE8',
  '#FFC334',
  '#E53030',
  '#0EC518',
];

const sounds = [
  'cow',
  'clock',
  'pig',
  'bear',
  'elephant',
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomPct = () => getRandomInt(0, 80);
const getRandomColor = () => colors[getRandomInt(0,colors.length-1)];
const getRandomSound = () => sounds[getRandomInt(0,sounds.length-1)];

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

class App extends Component {
  state = {
    posX: getRandomPct(),
    posY: getRandomPct(),
    show: true,
    color: getRandomColor(),
    fs: false,
  };

  componentDidMount() {
    launchIntoFullscreen(document.documentElement);
  }

  handleClick = () => {
    this.setState({
      show: false,
    });

    const audio = new Audio(`/sound/${getRandomSound()}.mp3`);
    audio.play();

    setTimeout(() => {
      this.setState({
        posX: getRandomPct(),
        posY: getRandomPct(),
        show: true,
        color: getRandomColor(),
      });
    }, 3000);
  }

  render() {
    return (
      <div style={{height: '100vh', width: '100%', position: 'relative'}}>
        {this.state.fs ?
        <div onTouchTap={() => { this.setState({ fs: false }); exitFullscreen(); }}>EFS</div>
          :
        <div onTouchTap={() => { this.setState({ fs: true }); launchIntoFullscreen(document.documentElement); }}>FS</div>
        }
        {this.state.show &&
          <a onTouchTap={this.handleClick}>
            <ShinyButton
              color={this.state.color}
              x={this.state.posX}
              y={this.state.posY}
            />
          </a>
        }
      </div>
    );
  }
}

export default App;
