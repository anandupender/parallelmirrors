# Anand Upender Brilliant Takehome
#### July 21, 2021
A brief journey into visualizing the forces at work that create infinite reflections between two parallel mirrors.   
  
    
    
---
    
     
### Assumptions and Current State

Approach
* I decided to focus on a single "side" of the mirror since a viewer can only have one "gaze" at a time. I thought it would be more intuitive for the user to focus on what they may see when looking at a single (left) mirror.
* We decided that a top-down view would best illustrate light rays
* We decided that rays could be simplified to a single line
* I assumed that the viewer has recently been introduced to the concept of equal angles of reflection.
* We decided that showing the viewer IN the box did not add to the concept explained here.
* I decided that moving the object in the vertical direction added less interesting insights than the x direction.

Current Interactivity:
* Drag the Trophy object left to right and observe the change in reflections
* Click on different Trophy reflections (virtual images) to see the light rays that produced them
     
     
---
    
     
### Reflection Questions

1. If I had double the time, I would have considered the UX more deeply. For example, I didn't have time to properly signify which elements were interactable/ draggable through various UI elements like arrows, hover states or animation. The various reflected images could have been labeled better perhaps with n=1, n=2.... The "room" itself could have reflected as well as opposed to solely the object. I would have also liked to address the learning questions of "why the virtual images get smaller and smaller" and "what would the reflections look like if the mirrors were not parallel".

2. Broadly, my order of operations in my build session was: Sketch reflection states in Figma -> Draw static "world" in p5 canvas -> Figure out mathematics -> Code base JS logic -> Test interactivity -> Add visual design. Next time, I'd move the "math" stage first to solidify my understanding of what I'd be displaying in code. I would have also spent some time testing out the first iteration of the interactive with people of different education levels.

3. Surprisingly, about half of my time was spent on finding the generalizable mathematical equation (and therefore the js function) that could ouput the position of rays of any of the infinite virtual images. Once I figured that equation out, it was simple to create a p5 canvas to iterate through any possible reflection state. Creating a "system" of objects with dynamic variables (positions, angles, lengths...) was exciting as I considered how to make elements modular and the code easily usable in the future. The visual design and incorporation of elements from the PIX system felt straightforward, well-constrained, and creative.

