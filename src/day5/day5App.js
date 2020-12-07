import React from 'react';

class Day5 extends React.Component {
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
    alert('An essay was submitted: ' + this.state.input);
    // console.log(this.state.input);
    event.preventDefault();
  }

  render() {
    let passes = this.state.input.split('\n');

    let highestId = -1;
    let ids = [];
    passes.forEach(function(e) {
      let id = parse(e);
      highestId = Math.max(highestId, id);
      ids.push(id);
    });

    ids.sort((a, b) => a - b);
    let missingId = -1;
    ids.forEach(function(e) {
      console.log(e);
    })
    for(let i = ids[0]; i < ids[ids.length-1]; i++) {
      let index = ids.indexOf(i);
      if(index === -1 && ids[ids.indexOf(i-1)] === i-1 && ids[ids.indexOf(i+1)] === i+1) {
        missingId = i;
        break;
      }
    }

    let resultPart1 = highestId;
    let resultPart2 = missingId;
    return (
      <div>
        <h1>Advent of Code 2020 - day 5</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input: 
              <textarea value={this.state.input} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <div>Result part 1: {resultPart1}</div>
            <div>Result part 2: {resultPart2}</div>
          </form>
        </div>
      </div>
    );
  }
}

function parse(code) {
  // console.log('parsing: '+code);
  let rows = new Array(128).fill().map((_, idx) => 0 + idx);
  let cols = new Array(8).fill().map((_, idx) => 0 + idx);

  for(let i = 0; i < 7; i++) {
    let c = code.charAt(i);
    if(c === 'F') {
      rows = rows.splice(0, rows.length/2);
      // console.log('new min: '+rows[0] + ', new max: '+rows[rows.length-1]);
    } else if(c === 'B') {
      rows = rows.splice(rows.length/2, rows.length);
      // console.log('new min: '+rows[0] + ', new max: '+rows[rows.length-1]);
    } else {
      // console.log('index ' + i + ' has incorrect value: '+c);
      return -1;
    }
  }

  // console.log('row: '+rows[0]);

  for(let i = 7; i < 10; i++) {
    let c = code.charAt(i);
    if(c === 'L') {
      cols = cols.splice(0, cols.length/2);
      // console.log('new min: '+cols[0] + ', new max: '+cols[rows.length-1]);
    } else if(c === 'R') {
      cols = cols.splice(cols.length/2, cols.length);
      // console.log('new min: '+cols[0] + ', new max: '+cols[rows.length-1]);
    } else {
      // console.log('index ' + i + ' has incorrect value: '+c);
      return -1;
    }
  }
  // console.log(rows[0]);
  // console.log(cols[0]);
  return (rows[0]*8)+cols[0];
}

export default Day5;