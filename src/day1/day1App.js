import React from 'react';

class Day1 extends React.Component {
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
    console.log(this.state.input);
    event.preventDefault();
  }


  render() {
    var input  = this.state.input.split('\n').map(v => parseInt(v));
    console.log('array: ');
    console.log(input);

    let values = findTarget(input, 2020);
    console.log('values: '+values);
    let result = null;
    if(values.length === 3) {
      result = values[0]*values[1]*values[2];
    } 
    console.log(result);
    return (
      <div>
        <h1>Advent of Code 2020 - day 1</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input: 
              <textarea value={this.state.input} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    <div>Result: {result}</div>
      </div>
    );
  }
}

// ========================================

function findTarget(array, target) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      for(let k = 0; k < array.length; k++) {
        if(i === j && i === k) continue; 
      // console.log('comparing' + array[i] + ' and ' +array[j]);
      if(array[i] + array[j] + array[k] === target) {
        return [array[i], array[j], array[k]];
      }    
      }
    }
  }
  return [];
}

export default Day1;