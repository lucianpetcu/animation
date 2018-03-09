window.onload = function(){
    var c1 = document.getElementById('c1');
    var c2 = document.getElementById('c2');
    var container = document.getElementById('container');


    function runner(aDiv,color,variabilaI,intervalTime)
    {
        this.Div = aDiv;
        this.Div.style.background = color;
        this.Pos = 0;
        this.interv ={
            variableInterval :variabilaI ,
            intervalTime : intervalTime          
        };
        this.isAccelerating = false;
    }
    
    function internalStartInterval(runner)
    {
         runner.interv.variableInterval = setInterval(function(){move(runner);}, runner.interv.intervalTime);
    }
    var var1;
    var var2;
    var r1 = new runner(c1 ,'red', var1,35);
    var r2 = new runner(c2 ,'blue',var2,20);
    internalStartInterval(r1);
    internalStartInterval(r2);

    var hasAccelerated = false;
    
    
    function move(r) {
        console.log(r.Div.offsetWidth);
        if(r.Pos >= (container.offsetWidth - r.Div.offsetWidth)) {
            stopRace(r);
        }
        else {
            r.Pos += 1;
            r.Div.style.left = r.Pos +'px';
            r.Div.firstChild.innerHTML = 'Arriving in '+(container.offsetWidth - r.Div.offsetWidth -parseInt(r.Div.style.left, 10))+' pixels';
            if (r.isAccelerating){
                r.Div.firstChild.innerHTML = r.Div.firstChild.innerHTML+ '\n Accelerating!!!';   
            }
            if ((container.offsetWidth - r.Div.offsetWidth -parseInt(r.Div.style.left, 10) < (container.offsetWidth/2)) &&  (!hasAccelerated)){
                if (r==r1){
                    accelerate(r2);}
                else{
                    accelerate(r1);
                }
                hasAccelerated = true;
            }
        }
    }

    function accelerate(r){
        clearInterval(r.interv.variableInterval);
        r.interv.intervalTime = r.interv.intervalTime -(r.interv.intervalTime *0.7);
        internalStartInterval(r);
        r.isAccelerating = true;
    }

    function stopRace(winner){
        clearInterval(r1.interv.variableInterval);
        clearInterval(r2.interv.variableInterval);
        c1.firstChild.innerHTML ='WINNER: '+ winner.Div.style.backgroundColor ;
        c2.firstChild.innerHTML = c1.firstChild.innerHTML;    }
    

}
