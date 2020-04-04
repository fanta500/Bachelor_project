import _ from 'lodash';
import P4 from './kepler';

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
    return element;
  }
  
  document.body.appendChild(component());