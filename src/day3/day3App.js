import React from 'react';

class Day2 extends React.Component {
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

    let matrix = [];
    matrix = extendArray(matrix, this.state.input);
    let treeCount; 
    if(this.state.input !== '') {
        treeCount = countTrees(1, 1, matrix, this.state.input);
        treeCount *= countTrees(3, 1, matrix, this.state.input);
        treeCount *= countTrees(5, 1, matrix, this.state.input);
        treeCount *= countTrees(7, 1, matrix, this.state.input);
        treeCount *= countTrees(1, 2, matrix, this.state.input);
    };
    

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
        <div>result: {treeCount}</div>
            {/* {output.map(item => { return <div>{item}</div>})} */}
      </div>
    );
  }
}

function countTrees(right, down, array, input) {
    let row = 0; 
    let col = 0;
    let treeCount = 0;
    while(true) {
        row += down; 
        col += right;
        if(row > array.length-1) return treeCount;
        if(!array[row][col]) {
            array = extendArray(array, input);
        }
        let val = array[row][col];
        if(val === '#') treeCount++;
    }
}

function extendArray(target, input) {
    let rows = input.split('\n');
    if(!target) {
        target = [];
    }
    for(let row = 0; row < rows.length; row++) {
        if(!target[row]) target[row] = [];
        let rowStartLength = target[row].length;
        for(let col = 0; col < rows[row].length; col++) {
            let value = rows[row][col];
            let index = col+rowStartLength;
            target[row][index] = value;
        }
    }
    return target;
}

export default Day2;