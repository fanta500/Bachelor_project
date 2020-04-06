import _ from 'lodash';
import keplerVis from './kepler';

function component() {
    //const element = document.createElement('div');
  
    //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
    //return element;
    keplerVis()
  }
  
  document.body.appendChild(component());