import React from 'react';

class Day9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    let numbers = parse(this.state.input);
    // let preamble = numbers.slice(0, 5);
    let preamble = 25;
    console.log(numbers);
    // console.log(preamble);
    
    let numberWithoutSum = -1;
    for(let i = preamble; i < numbers.length; i++) {
        let previous = numbers.slice(i-preamble, i);
        let inValue = numbers[i];
        let hasSum = false;
        let sums = new Set();
        for(let k = 0; k < previous.length; k++) {
            if(sums.has(inValue-previous[k])) {
                hasSum = true; 
            }
            sums.add(previous[k]);
        }
        if(!hasSum) {
            numberWithoutSum = inValue;
        }
    }
    let weakness = -1;
    if(numbers.length > 0) {
      weakness = findWeakness(numbers, numberWithoutSum);
    }
    let resultPart1 = numberWithoutSum;
    let resultPart2 = weakness;
    return (
      <div>
        <h1>Advent of Code 2020 - day 9</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input: 
              <textarea value={this.state.input} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>Valid part 1: {resultPart1}</div>
        <div>Valid part 2: {resultPart2}</div>
      </div>
    );
  }
}

function findWeakness(numbers, numberWithoutSum) {
  let windowSize = 2;
    while(windowSize < numbers.length) {
      for(let i = 0; i < numbers.length; i++) {
        let range = numbers.slice(i, i+windowSize);
        let sum = range.reduce((acc, v) => acc+v);
        if(sum === numberWithoutSum) {
          return Math.min(...range)+Math.max(...range);
        }
      }
      windowSize++;
    }
}


function parse(input) {
    if(!input) return [];
    return input.split('\n').map(line => Number(line));
}
export default Day9;