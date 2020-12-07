import React from 'react';

class Day7 extends React.Component {
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
    let rules = parse(this.state.input);
    let count = 0;
    let count2 = 0;

    if(rules !== undefined && Object.keys(rules).length > 0) {
      for(let key in rules) {
        if(containsColor(rules[key], 'shiny gold', rules)) count++;
      }
      count2 = countBagsNeeded(rules['shiny gold'], rules);
    }

    let resultPart1 = count;
    let resultPart2 = count2;
    return (
      <div>
        <h1>Advent of Code 2020 - day 7</h1>
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

function containsColor(bag, targetColor, rules) {
  if(bag.childBags === null) {
    return false;
  }
  for(let i = 0; i < bag.childBags.length; i++) {
    let curr = bag.childBags[i];
    if(curr.color === targetColor || containsColor(rules[curr.color], targetColor, rules)) return true;
  }
}

function countBagsNeeded(bag, rules) {
  if(bag.childBags === null) {
    return 0;
  }
  let numberOfBags = 0;
  for(let i = 0; i < bag.childBags.length; i++) {
    let curr = bag.childBags[i];
    numberOfBags += countBagsNeeded(rules[curr.color], rules)*curr.count+curr.count;
  }
  return numberOfBags;
}

function parse(input) {
    if(!input) {
        return {};
    }
    return input.split('\n').reduce( (acc, row) => {
      let split = row.split('contain');
      let bagColor = split[0].split('bags')[0].trim();
      let childBags = split[1].trim().split(',').filter(x => x !== 'no other bags.').map(e => {
          let arr = e.trim().split(' ');
          let count = parseInt(arr[0]);
          let color = arr[1]+' '+arr[2];
          return {count: count, color: color};
      });
      acc[bagColor] = {color: bagColor, childBags: childBags};
      return acc;
    }, []);
}

export default Day7;