import React from 'react';

class Day10 extends React.Component {
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
    let adapters = parse(this.state.input);
    adapters = sortNumbers(adapters);
    console.log(adapters);   
    let difference = countDifferences(adapters);
    let paths = -1;
    if(adapters.length > 0) {
        paths = countPaths(adapters);
    }
    let resultPart1 = difference;
    let resultPart2 = paths;
    let correct = (resultPart2 === 193434623148032 || resultPart2 === 19208) ? 'true' : 'false';
    return (
      <div>
        <h1>Advent of Code 2020 - day 10</h1>
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
        <div>Valid part 2: {resultPart2} ({correct})</div>
      </div>
    );
  }
}

function countPaths(adapters) {
    if(adapters.length < 1 ) return -1;
    adapters.unshift(Number(0));
    adapters.push(adapters[adapters.length-1]+3);
    console.log(adapters);
    let variations = 1;
    let groups = [];
    let s = ''; 
    let groupNums = [];
    for(let i = 0; i < adapters.length; i++) {
        let num = adapters[i];
        let closest = adapters.slice(i+1, i+4).filter(v => v <= num+3);
        s += num+', ';
        groupNums.push(num);
        if(closest.length === 1 && closest[0]-num === 3) {
            // console.log('found 3 steps, group: '+s);
            // groups.push(variations);
            // let count = countSeq(groupNums);
            // let count = countSeq(groupNums);
            let count = 0;
            switch(groupNums.length) {
                case 1: 
                count = 1;
                break;
                case 2: 
                count = 1;
                break;
                case 3: 
                count = 2; 
                break;
                case 4: 
                count = 4; 
                break;
                case 5: 
                count = 7;
                break;
                default: 
                count = 1;
            }
            groups.push(count);
            console.log('add count: '+count+' for group: '+s);
            groupNums = [];
            s = '';
        } else {
            // if(closest.length > 1) {
            //     variations += closest.length;
            // }
        }
        // console.log(closest);
        // console.log(num);
    }
    // console.log(groups);
    // console.log(groupNums);
    return groups.reduce((acc, v) => acc*v);
}

function findClosestAdapters(currentJoltage, adapterSet) {
    let closest = [];
    for(let adapter of adapterSet) {
        if(closest.length > 2) {
            break;
        }
        if(adapter === currentJoltage+1 || adapter === currentJoltage+2 || adapter === currentJoltage+3) {
            closest.push(adapter);
        }
    }
    return closest;
}

function countDifferences(adapters) {
    let oneDifferences = 0;
    let threeDifferences = 0;
    let currentJoltage = 0;
    let adapterSet = new Set(adapters);
    console.log('adapters: '+adapters.length);
    console.log('set: '+adapterSet.size);
    let i = 0;
    while(adapterSet.size > 0) {
        // console.log('--- NEW ITERATION ---');
        // console.log('Current joltage: '+currentJoltage);
        let closestSet = findClosestAdapters(currentJoltage, adapterSet);
        let closest = Math.min(...closestSet);
        // console.log('Remaining set');
        // console.log(adapterSet);
        // console.log('closest: '+closest);
        if(closest-currentJoltage === 1) oneDifferences++;
        if(closest-currentJoltage === 3) threeDifferences++;
        currentJoltage = closest;
        adapterSet.delete(closest);
        i++;
        if(i > adapters.length) {
            console.log('ERROR too many iterations');
            break;
        }
    }
    threeDifferences++;
    return oneDifferences*threeDifferences;

}

function sortNumbers(array) {
    return array.sort(function(a, b) {
      return a - b;
    });
  }

function parse(input) {
    if(!input) return [];
    return input.split('\n').map(line => Number(line));
}
export default Day10;