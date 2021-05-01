/**
 * D3.js Demos / Tutorials:
 * 
 * https://github.com/d3/d3/wiki/Tutorials
 * 
 * https://www.freecodecamp.org/news/learn-d3-js-in-5-minutes-c5ec29fb0725/
 */

let fruits = ['apple', 'mango', 'banana', 'orange'];
d3.select('ul')
  .selectAll('li')
  .data(fruits)
  .enter()
  .append('li')
  .text(d => { return d; });

let svg = d3.select('svg');

//Create rectangle element inside SVG
svg.append('rect')
  .attr('x', 25)
  .attr('y', 25)
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'green');

let data = [80, 120, 60, 150, 200];
let barHeight = 20;
let bar = d3.select('#svg-graph')
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('width', function(d) {  return d; })
  .attr('height', barHeight - 1)
  .attr('transform', function(d, i) {
    return "translate(0," + i * barHeight + ")";
  });

d3.select('#btn').on('click', () => {
  d3.select('#btn-section').append('h3').text('Today is a beautiful day!!');
});