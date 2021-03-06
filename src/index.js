import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Day1 from './day1/day1App.js'
// import Day2 from './day2/day2App.js'
// import Day3 from './day3/day3App.js'
import Day4 from './day4/day4App.js'
import Day5 from './day5/day5App.js'
// import Day6 from './day6/day6App.js'
// import Day7 from './day7/day7App.js'
// import Day8 from './day8/day8App.js'
// import Day9 from './day9/day9App.js'
// import Day10 from './Day10/day10App.js'
import Day11 from './Day11/day11App.js'

// function Aoc(props) {
//   let day = 'Day4';

//   if(day === 'Day4') {
//     return <Day4 />;
//   }
// }

class Advent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {day: <Day11 />};
    this.handleDay1Button = this.handleDay1Button.bind(this);
    this.handleDay4Button = this.handleDay4Button.bind(this);
    this.handleDay5Button = this.handleDay5Button.bind(this);
  }

  handleDay1Button(event) {
    this.setState({day: <Day1 />});
  }

  handleDay4Button(event) {
    this.setState({day: <Day4 />});
    console.log('day 4');
  }

  handleDay5Button(event) {
    this.setState({day: <Day5 />});
    console.log('day 4');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleDay1Button}>Day 1</button>
        <button onClick={this.handleDay4Button}>Day 4</button>
        <button onClick={this.handleDay5Button}>Day 5</button>
        {this.state.day}
      </div>
    )
  }
}

ReactDOM.render(
  <Advent />,
  document.getElementById('root')
);