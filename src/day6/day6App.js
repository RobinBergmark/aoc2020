import React from 'react';

class Day4 extends React.Component {
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
      let groups = this.state.input.split('\n\n').reduce((acc, curr, index) => {
        //   console.log(curr.split('\n').length);  number of people
        let numberOfPeople = curr.split('\n').length;

        let arr = curr.replace(/\n/g, '').split('');
        // console.log(arr);
        let questionsWithAnyYes = [...new Set(arr)].length;

        let totalYes = arr.reduce((a, c) => {
            if(!a[c]) a[c] = 0;
            a[c] = a[c]+1;
            return a;
        }, {});
        let array = Object.entries(totalYes);
        // console.log(array);
        let allYesCount = array.filter(o => o[1] === numberOfPeople).length;
        acc[index] = {people: numberOfPeople, yes: questionsWithAnyYes, allYes: allYesCount};
        return acc;
        // console.log(curr.replace(/\n/g, ''));
      }, []);
    // let groups = this.state.input.split('\n\n').map(function(e) {
    //     return e.split('\n').reduce((acc, curr, index) => {
    //         // console.log(curr);
    //         let arr = curr.split(':');
    //         acc[index] = {id: index, numberOfPeople: curr.length, numYes: 0}
    //         return acc; 
    //     }, {});
    // });
    console.log(groups);
    let validPart1 = groups.reduce((a, {yes}) => a+yes, 0);
    let validPart2 = groups.reduce((a, {allYes}) => a+allYes, 0);
    return (
      <div>
        <h1>Advent of Code 2020 - day 6</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input: 
              <textarea value={this.state.input} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>Valid part 1: {validPart1}</div>
        <div>Valid part 2: {validPart2}</div>
      </div>
    );
  }
}

function logArray(arr) {
    let s = '';
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            s += arr[i][j];
        }
        console.log(s);
    }
}

export default Day4;