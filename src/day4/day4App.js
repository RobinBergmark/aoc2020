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
    // console.log(this.state.input);
    event.preventDefault();
  }


  render() {

    let passStrings = this.state.input.replace(/(?:\r\n|\r|\n)/g, '---').split('------');
    let passports = passStrings.map(function(e) {
        return e.replace(/---/g, ' ').split(' ').reduce((acc, curr, index) => {
            let arr = curr.split(':');
            acc[arr[0]] = arr[1];
            return acc; 
        }, {});
    });
    let validPart1 = 0;
    let validPart2 = 0;
    for(let i = 0; i < passports.length; i++) {
        if(isValidPassport1(passports[i])) {
            validPart1++;
        }
        if(isValidPassport2(passports[i])) {
            validPart2++;
        }
    }
    console.log(passports);
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
        <div>Valid part 1: {validPart1}</div>
        <div>Valid part 2: {validPart2}</div>
      </div>
    );
  }
}

function isValidPassport1(passport) {
    let requiredProperties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return requiredProperties.every(function(e) { return e in passport});
}

function isValidPassport2(passport) {
    let requiredProperties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let hasAll = requiredProperties.every(function(e) { return e in passport});
    if(!hasAll) return false;

    let validations = {
        byr: function (e) { return e <= 2002 && e >= 1920},
        iyr: function(e) { return e <= 2020 && e >= 2010},
        eyr: function(e) { return e <= 2030 && e >= 2020}, 
        hcl: function(e) { return RegExp('^#(?:[0-9a-f]{3}){1,2}$').test(e)},
        ecl: function(e) { return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(e) > -1},
        pid: function(e) { return RegExp('^[0-9]{9}$').test(e)},
        hgt: function(e) {
            let unit = e.slice(-2);
            if(unit === 'cm') {
                let num = Number(e.substring(0, 3));
                return e.length === 5 && num <= 193 && num >= 150;
            } else if(unit === 'in') {
                let num = Number(e.substring(0, 2));
                return e.length === 4 && num <= 76 && num >= 59;
            } else {
                return false;
            }
        }
    };

    for(let prop in passport) {
        if(prop === 'cid') continue;
        // console.log(prop);
        // console.log(validations[prop]);
        if(validations[prop](passport[prop]) === false) {
            console.log('Failed validation for property ' + prop + ' with value: ' + passport[prop]);
            return false;
        }
    }
    return true;
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

export default Day2;