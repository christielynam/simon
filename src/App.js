import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      playerPattern: [],
      simonPattern: [],
      level: 0,
      0: false,
      1: false,
      2: false,
      3: false
    }
  }

  handleClick = () => {
    this.clearGame()
    this.levelUp()
  }

  clearGame = () => {
    this.setState({
      simonPattern: [],
      playerPattern: [],
      level: 0,
      0: false,
      1: false,
      2: false,
      3: false
    })
  }

  levelUp = () => {
    const { level } = this.state
    this.setState({ level: level + 1 })
    this.updateSimonPattern()
  }
  
  updateSimonPattern = async () => {
    const { simonPattern } = this.state
    const randomNum = Math.floor(Math.random() * 4)
    const newPattern = [...simonPattern, randomNum]
    await this.setState({ simonPattern: newPattern })
    this.showPattern()
  }

  showPattern = () => {
    const { simonPattern } = this.state
    let i = 0
    const interval = setInterval(() => {
      this.toggleActive(simonPattern[i])
      i++
      if(i >= simonPattern.length) {
        clearInterval(interval)
      }
    }, 750)
    this.setState({ playerPattern: [] })
  }

  toggleActive = (id) => {
    this.setState({ [id]: !this.state[id] })
    setTimeout(() => {
      this.setState({ [id]: !this.state[id] })
    }, 500)
  }

  updatePlayerPattern = async (event) => {
    const { playerPattern } = this.state
    const newNum = event.target.attributes.getNamedItem('num').value
    await this.setState({ playerPattern: [...playerPattern, parseInt(newNum)] })
    this.checkResponse()
  }

  checkResponse = () => {
    const { playerPattern, simonPattern, level } = this.state
    const lastNum = playerPattern.length - 1
    if (playerPattern[lastNum] !== simonPattern[lastNum]) {
      window.alert('NOPE!')
      this.clearGame()
    } else {
      console.log('Good job!')
      const done = playerPattern.length === simonPattern.length
      if (done) {
        if (level === 5) {
          alert('WINNER')
          this.clearGame()
        } else {
          alert('LEVEL UP!')
          this.levelUp()
        }
      }
    }
  }

  render() {
    const { level } = this.state
    return (
      <div className="App">
        <div className='game-board'>
          <div
            num={0} 
            className={this.state[0] ? 'pad green active' : 'pad green'}
            onClick={this.updatePlayerPattern}>
          </div>
          <div
            num={1} 
            className={this.state[1] ? 'pad red active' : 'pad red'}
            onClick={this.updatePlayerPattern}>
          </div>
          <div 
            num={2}
            className={this.state[2] ? 'pad yellow active' : 'pad yellow'}
            onClick={this.updatePlayerPattern}>
          </div>
          <div 
            num={3}
            className={this.state[3] ? 'pad blue active' : 'pad blue'}
            onClick={this.updatePlayerPattern}>
          </div> 
        </div>
        <div className='controls'>
          <h3>SIMON</h3>
          <h4>Level: {level}</h4>
          <button 
            onClick={this.handleClick} 
            className='start-btn'>
            Start
          </button>
        </div> 
      </div>
    );
  }
}

export default App;
