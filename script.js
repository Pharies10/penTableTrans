var penPromise= d3.json(src="penguins/classData.json")
var success=function(data)
    {
        
        data.map(transformPen)
        console.log(data);
        createTable(data)
    }


var fail=function(data)
    {
        console.log("fail");

    }
penPromise.then(success, fail);



var createTable = function(data)
{
    

    
    var table = d3.select("tbody").selectAll("tr").data(data).enter().append("tr").attr("id", function(d){
        if (d.totalGrade<70)
            {
                return "lessThan70"
            }
        else{
            
            return "good"
            
        }
    })
    
    table.append("td").append("img").attr("src", function(d){ return "/penguins/" + d.picture;})
    table.append("td").text(function(d){ return d.quizMean;})
    table.append("td").text(function(d){ return d.hwMean;})
    table.append("td").text(function(d){ return d.testMean;})
    table.append("td").text(function(d){ return d.final[0].grade;})
    table.append('td').text(function(d){ return d.totalGrade;})
    
    d3.select("thead").selectAll("th").data(data).enter()
    
    
    d3.select("#meanquiz").on("click", function()
                            {
                               getQuzList(data)
                               removeTable()
                               createTable(data)
    
                            })
    
    d3.select("#homeworkmean").on("click", function()
                            {
                               getHWList(data)
                               removeTable()
                               createTable(data)
    
                            })
    
    d3.select("#testmean").on("click", function()
                            {
                               getTestList(data)
                               removeTable()
                               createTable(data)
    
                            })
    
    d3.select("#finalscore").on("click", function()
                            {
                               getFinalList(data)
                               removeTable()
                               createTable(data)
    
                            })
    
    
}


var getQuzList = function(penguinList)
{
    
    penguinList.sort(compareQuizData);

    
}

var getHWList = function(penguinList)
{
    
    penguinList.sort(compareHWData);

    
}

var getTestList = function(penguinList)
{
    
    penguinList.sort(compareTestData);

    
}

var getFinalList = function(penguinList)
{
    
    penguinList.sort(compareFinalData);

    
}





var removeTable=function()
{
    d3.selectAll("tbody *")
    .remove()
            
}


// transform the penguins to be more desirable for project
var transformPen = function(pen)
{
    
    // get all the means
    var qMean= getQuizMean(pen)*10
        
    var tMean= getTestMean(pen)
       
    var HWMean= getHWMean(pen)*2
    
    var total= qMean*.2+tMean*.3+HWMean*.15+pen.final[0].grade*.35
    
    pen.quizMean = qMean;
    pen.testMean = tMean;
    pen.hwMean = HWMean;
    pen.totalGrade= total;
 
}


// mean functions
var getQuizGrade= function(quiz)
    {
        return quiz.grade
    }
var getQuizMean= function(penguin)
    {
        return d3.mean(penguin.quizes.map(getQuizGrade))
    }

var getTestGrade= function(test)
    {
        return test.grade
    }
var getTestMean= function(penguin)
    {
        return d3.mean(penguin.test.map(getTestGrade))
    }

var getHWGrade= function(homework)
    {
        return homework.grade
    }
var getHWMean= function(penguin)
    {
        return d3.mean(penguin.homework.map(getHWGrade))
    }


var compareQuizData =function(a,b)
    {
        if (a.quizMean==b.quizMean)
            {
                return 0;
            }
        else if (a.quizMean<b.quizMean)
            {return 1;}
        else //(a.quizMean>b.quizMean)
            {return -1;}
        
    }

var compareHWData =function(a,b)
    {
        if (a.hwMean==b.hwMean)
            {
                return 0;
            }
        else if (a.hwMean<b.hwMean)
            {return 1;}
        else //(a.hwMean>b.hwMean)
            {return -1;}
        
    }

var compareTestData =function(a,b)
    {
        if (a.testMean==b.testMean)
            {
                return 0;
            }
        else if (a.testMean<b.testMean)
            {return 1;}
        else //(a.testMean>b.testMean)
            {return -1;}
        
    }

var compareFinalData =function(a,b)
    {
        if (a.final[0].grade==b.final[0].grade)
            {
                return 0;
            }
        else if (a.final[0].grade<b.final[0].grade)
            {return 1;}
        else //(a.final[0].grade>b.final[0].grade)
            {return -1;}
        
    }







// extra work for the 10





