# Table

| *Status: Work In progress*

Preview url: 
[ronnidc.github.io/examples/table](https://ronnidc.github.io/examples/table)

### Notes

To Do: To enable a table without overflow or max-height on larger devices the folowing class'
`scroll-max-sm`, `scroll-max-md`,`scroll-max-lg` 
could could be applied to define how narrow the viewport should be before `overflow-x: auto` and `max-height: xx;` are applied to these breakpoints.
The class is applied to the table-wrapper element. What class to apply is defined by how wide the amount of table-data is. 
This decision could be made by inteligent code or by the CMS editor. 

To Do: For now the animation restarts when the user swipes again 60 sec after the previous animation view, even if the user has been interacting with the page the whole time. This could be rather anoying and should be changed to only restart when there has been no user movement in more than 60 secunds and the user returns and start interacting with the table.

#### Inspirational & usefull links

- https://codepen.io/ronnidc/pen/OJQJGQM
- https://codepen.io/jon/pen/JZNvap
