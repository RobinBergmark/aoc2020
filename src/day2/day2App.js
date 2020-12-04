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
    var passwords  = this.state.input.split('\n').map(function(e) {
        let arr = e.split(': ');
        let arr2 = arr[0].split(' ');
        let arr3 = arr2[0].split('-');
        return {password: arr[1], char: arr2[1], pos1: arr3[0], pos2: arr3[1]}
    });
    if(this.state.input === undefined || this.state.input === '') {
        passwords = [];
    }
    console.log(passwords);

    let result; 
    let result2;
    console.log("number of passwords: "+passwords.length);
    if(passwords.length > 0) {
        result = passwords.filter((v) => {
            // console.log(v);
            let matches = v.password.match(new RegExp(v.char, "g"));
            let occurences = matches ? matches.length : 0;
            // console.log("occurences of " + v.char + " in " + v.password + ": " + occurences);
            return occurences <= v.pos2 && occurences >= v.pos1;
        }).length;

        result2 = passwords.filter((v) => {
            return (v.password.charAt(v.pos1-1) === v.char && v.password.charAt(v.pos2-1) !== v.char ) || (v.password.charAt(v.pos2-1) === v.char && v.password.charAt(v.pos1-1) !== v.char);
        }).length
        // console.log("res: "+result);
    }


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
        <div>Result2: {result2}</div>
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

export default Day2;