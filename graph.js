
            
var penpromise= d3.json("penguins/classData.json")


var success= function(data)
{
    
    var days = d3.range(38)
    d3.select("div")
    .selectAll("span")
        .data(days)
        .enter()
        .append("span")
        .append("button")
        .text(function(d) {return d})
        .on("click", function(n){
        
        
        var mapPen1= function(p,i)
        {
            var xPen = i
            var yPen = p.quizes[n].grade
    
            return { x:xPen, y:yPen}
    
        }
        
        var quizList = data.map(mapPen1)
        
        
        var xScale = makeXScale(quizList)
        var  yScale = makeYScale(quizList)
        makeNext(n, data)
        makePrev(n, data)
        drawpoints(quizList, xScale, yScale)
        
    })
    
    
    
    
    makeNext(0, data)
    makePrev(0, data)
  
 
    
    
}

var fail=function(data)
{
    console.log("doesn't work")
}

penpromise.then(success,fail)
                


var screen={width:800,height:600}

var drawpoints=function(quizList, xScale, yScale)
{
    
    d3.selectAll('svg *').remove()
    
    
    d3.select('svg')
    .attr("height",screen.height)
    .attr("width",screen.width)
    
 
    
    d3.select('svg')
    .selectAll("circle")
    .data(quizList)
    .enter()
    .append("circle")
    .attr("cx",function(q){return xScale(q.x)})
    .attr("cy",function(q){return yScale(q.y)})
    .attr("r",10)
    
    
    
    
    
    
}



var makeNext = function(n, data)
{
    
    d3.select("#next").remove()
    
    d3.select("div")
        .append("span")
        .append("button")
        .attr("id", "next")
        .text("next")
        .on("click", function(){
        
        if (n > 0 && n < 38) 
        {
        
        var mapPen1= function(p,i)
        {
            console.log(p.quizes[n+1].grade)
            var xPen = i
            var yPen = p.quizes[n+1].grade
    
            return { x:xPen, y:yPen}
    
        
    
        }
        
        var quizList = data.map(mapPen1)
        
        
        var xScale = makeXScale(quizList)
        var  yScale = makeYScale(quizList)
        makeNext(n+1,data)
        makePrev(n+1,data)
        drawpoints(quizList, xScale, yScale)
        
        }
        
        
        
        
        
        
        
    })
    
    
    
    
    
    
    
}



var makePrev = function(n, data)
{
    
    d3.select("#prev").remove()
    d3.select("div")
        .append("span")
        .append("button")
        .attr("id", "prev")
        .text("prev")
        .on("click", function(){
        
        if (n > 0 || n < 38) 
        {
        
        var mapPen1= function(p,i)
        {
            console.log(p.quizes[n-1].grade)
            var xPen = i
            var yPen = p.quizes[n-1].grade
    
            return { x:xPen, y:yPen}
    
        
    
        }
        
        var quizList = data.map(mapPen1)
        
        
        var xScale = makeXScale(quizList)
        var  yScale = makeYScale(quizList)
        makeNext(n-1,data)
        makePrev(n-1, data)
        drawpoints(quizList, xScale, yScale)
        
        
        }
        
        
        
        
        
        
        
    })
    
    
    
    
    
    
    
}












var makeXScale = function(data)
{
var xScale=d3.scaleLinear()
 xScale.domain(
 [
     d3.min(data,function(d){return d.x}),
     d3.max(data,function(d){return d.x})
 ]
 )
xScale.range([0,screen.width])

 return xScale
}


var makeYScale = function(data)
{
var yScale=d3.scaleLinear()
 yScale.domain(
 [
    d3.min(data,function(d){return d.y}),
     d3.max(data,function(d){return d.y})
 ]
 )
yScale.range([screen.height,0])
return yScale
    
}





