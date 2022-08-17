# Table

| *Status: Ready for production use*

Preview url: 
[ronnidc.github.io/examples/table](https://ronnidc.github.io/examples/table)

## Description

Todo.. *what does it do and why do we need it..*

## Implementation

### Required
1. Add a wrapper to your table with the css class `table`
    ````html
    <div class="table">
        <table>
            ....
    ````
2. Implement the css file table.css to the page
    ````html
    <head>
        <link rel="stylesheet" href="./table.css">
    </head>
    ````
3. Implement the javascript file table.js to the page
    ````html
            ....
            <script src="./table.js"></script>
        </body>
    </html>
    ````

### Optional settings

4. If the header should be sticky, add the data atribute `data-stickyheader="true"` to the table wrapper. 
````html
    <div class="table" data-stickyheader="true">
````

5. If the first (left) column also should be sticky, add the additional data atribute `data-stickycolumn="true"` to the table wrapper. 
````html
    <div class="table" data-stickyheader="true" data-stickycolumn="true">
````