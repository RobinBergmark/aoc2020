import React from 'react';

class Day8 extends React.Component {
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
    let instructions = parse(this.state.input);
    console.log(instructions);

    
    let resultPart1 = runProgram(instructions);
    let resultPart2 = 0;
    for(let i = 0; i < instructions.length; i++) {
        let instructionsCopy = [...instructions];
        let instructionCopy = Object.assign({}, instructions[i]);
        

        if(instructionCopy.operation === 'nop') {
            instructionCopy.operation = 'jmp';
        } else if(instructionCopy.operation === 'jmp') {
            instructionCopy.operation = 'nop';
        }
        instructionsCopy[i] = instructionCopy;
        let [terminated, acc] = runProgram(instructionsCopy);
        if(terminated === true) {
            resultPart2 = acc;
            break;
        }
    }

    return (
      <div>
        <h1>Advent of Code 2020 - day 8</h1>
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

function runProgram(instructions) {
    let executionCount = new Array(instructions.length).fill(0);
    let i = 0;
    let acc = Number(0);
    let count = 0;
    while(instructions.length > 0) {
        // console.log(' ----------- NEW ITERATION -----------');
        // console.log('Current i: '+i);
        let instruction = instructions[i]; 
        // console.log('i: '+i);
        // console.log(instruction);
        if(executionCount[i] === 1) {
            return [false, acc];
        }
        executionCount[i]++;
        switch(instruction.operation) {
            case 'acc':
                // console.log('changing accumulator, current: '+acc);
                acc = instruction.operator(acc, instruction.value);
                // console.log('New ACCUMULATOR: '+acc);
                i = increment(i, operators['+'], 1, instructions.length);
                // console.log('new acc i: '+i);
                break;
            case 'jmp': 
                i = increment(i, instruction.operator, instruction.value, instructions.length);
                // console.log('new jmp i: '+i);
                break;
            case 'nop':
                i = increment(i, operators['+'], 1, instructions.length);
                // console.log('new nop i: '+i);
                break;
            default:
                // console.log('UNEPXECTED INPUT');
                break;
        }
        
        if(i === instructions.length) {
            return [true, acc];
        }
        if(count > 1000) {
            // console.log('ERROR TOO MANY ITERATIONS');
            return [false, null];
        }
        count++;
    }
    return [null, null];
}

function parse(input) {
    if(!input) return [];
    return input.split('\n').map(line => {
        let arr = line.split(' ');
       return {operation: arr[0], operator: operators[arr[1].charAt(0)], value: arr[1].slice(1)} 
    });
}

var operators = {
    '+': function(a, b){ return Number(a)+Number(b)},
    '-': function(a, b){ return Number(a)-Number(b)}
 }

 function increment(currentIndex, operator, value, arrayLength) {
    //  return (operator(currentIndex, value)) % arrayLength;
    return operator(currentIndex, value);
 }
export default Day8;