var penpromise= d3.json("penguins/classData.json")


var screen = {width:1000,height:700}
var margins = {top:10,right:25,left:35,bottom:50}



var success = function(data)
{
        var newData = transformPen(data)
        console.log(newData)
        setup(data)
    }
var fail = function(data)
    {
        console.log("fail", data)
    }
penpromise.then(success,fail)

//tranform the pengin
var transformPen = function(classroom)
{
    var newData = classroom.map(changePen)
    return newData
}

var changePen = function(penguin)
{
    var quizList = penguin.quizes.map(getGrade)
    penguin.quizGrades = quizList
    return penguin
}

var getGrade = function(quiz)
{
    return quiz.grade
}


var setup = function(data)
{
    
    var pen = d3.range(0,23)
    

    d3.select("svg")
      .attr("width",screen.width)
      .attr("height",screen.height)
      .append("g")
      .attr("id","graph")
      .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;

    var xScale = d3.scaleLinear()
                   .domain([0,38])
                   .range([0,width])
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height,0])
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    
    d3.select("svg")
      .append("g")
      .classed("axis",true)
    
    d3.select(".axis")
      .append("g")
      .attr("id","xAxis")
      .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
      .call(xAxis)
    
    d3.select(".axis")
      .append("g")
      .attr("id","yAxis")
      .attr("transform","translate(25, "+margins.top+")")
      .call(yAxis)
    
    
    drawPoints(data, 0, xScale, yScale)
    
    
    d3.select("div")
        .selectAll("button")
        .data(pen)
        .enter()
        .append("button")
        .text(function(i){return "Penguin #"+(i+1)})
        .on("click", function(i){
        
        transPoint(data, i, xScale, yScale)
        
    })
    
    
    
    
    
}

var transPoint = function(data, index, xScale, yScale)
{
    
    
        var arrays = d3.select("#graph")
        .selectAll("circle")
        .data(data[index].quizGrades)
        .transition()
        .duration(500)
        .attr("cx",function(q,i){ return xScale(i)})
        .attr("cy",function(q){return yScale(q)})
        .attr("r",5)
        .style("fill", function(grade){
            
            
            if(grade <= 5){
                    return "red"
                    
                    
                }
            else{
                return "blue"
                
                
            }
            
            
        }
        
        
        )
    
    
    
    
}



var drawPoints = function(data, index, xScale, yScale)
{
    
    
    
    
    d3.selectAll("circle").remove()
   
    var arrays = d3.select("#graph")
        .selectAll("circle")
        .data(data[index].quizGrades)
        .enter()
        .append("circle")

         .attr("cx",function(q,i){ return xScale(i)})
        .attr("cy",function(q){return yScale(q)})
        .attr("r",5)
        .style("fill", function(grade){
            
            
            if(grade <= 5){
                    return "red"
                    
                    
                }
            else{
                return "blue"
                
                
            }
            
            
        })
    
    
    
}




















