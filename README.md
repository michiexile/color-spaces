# Color Space explorer

This toy lets you explore different color spaces by displaying controls for each, and adapting the display of 
all control sets by the changes made in any one of the controls.

It was built with some abstractions: the meat of the app sits in the `AbstractPicker` component, which requires
you to give it

1. `colorConstructor`: A color object constructor function (like `rgb` or `hsl` or `lab` from `d3-color`)
2. `coordData`: A specification of the color coordinates to display, as an object with each key corresponding to one of the
   coordinates, and each corresponding value an object with entries `stepcount` (how many colors to compute to
   make the gradient on the control), `scale` (optional, a `d3-scale` object to translate between the representation
   needed for the color object constructor and the representation needed for the display - if you want the
   constructor to receive values in [0,1], but want to show percentages, you'd use 
   `scale: scaleLinear().domain([0,100]).range([0,1])`), and `unit` (optional, a string suffix used to tag 
   the numeric display)
3. `listKey`: A string that lets the module build unique identifiers for the `<li>` tags to help React keep track of everything
   under the hood.

With the `AbstractPicker` built and ready, each additional color space only needs a very short component file that
constructs an `AbstractPicker` with the right props, and an entry in the list of color pickers in `index.tsx`.

This was built in React.js, using Gatsby.js as a framework (but without using much of the functionality in Gatsby),
and with extensive use of d3.js and various additional color libraries built to be compatible with `d3-color`. 