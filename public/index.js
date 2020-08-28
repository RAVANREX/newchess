
  let gamemode = "null"
  let playerNum = 0
  let ready=false
  let enemyready=false
  let currentplayer="user"
  
   //select player mode
   $("#singleplayerbutton").click(function(e){
    gamemode="singleplayer"
    console.log('hellow world')
   })

   $("#multiplayerbutton").click(function(e){
    gamemode="multiplayer"
    const socket=io();
    //get your player number
    socket.on('player-number',num=>{
    if(num==-1)
    document.getElementById("info").innerHTML="sorry this server is full"
    else{
    playerNum=parseInt(num)
    if(playerNum==1)
    currentplayer="enemy"


    console.log(playerNum)
    }
}) 

//another player has connected or disconnected
socket.on('player-connection', num=>{
    console.log(`player number ${num} has connected or disconnected `)
    playerconnectedordisconnected(num)
   })
   function playerconnectedordisconnected(num){
       let player=`.p${parseInt(num)+1}`
       document.querySelector(`${player}.connected span`).classList.toggle('green')
       if(parseInt(num)==playerNum){
           document.querySelector(player).style.fontWeight='bold  '
       }
   }
   })







    var currentID="",prevID="",q1="",q2="",q3="",q4="",q5="",q6="",q7="",q8="";
    var b1="",b2="",b3="",b4="";
    var c1="",c2="",c3="",c4="";
    var num=1;
    var whiteKingPos="74",blackKingPos="04";
    var flag="white";
    $("div").click(function(evt){
        console.log(flag)
        currentID=this.id;
        
         if(num==1){
            if(flag=="white" && $("#"+currentID).attr("class")=="white")
            num=fun1();
            else if(flag=="black" && $("#"+currentID).attr("class")=="black")
            num=fun1();
        }else if(num==0){
            if(flag=="black")
            num=bpawn();
        }else if(num==2){
            if(flag=="white")
            num=wpawn();
        }else if(num==3){
            num=boat();
        }else if(num==4){
            num=bishop();
        }else if(num==5){
            num=queen();
        }else if(num==6){
            num=knight();
        }else if(num==7){
            num=king();
        }
    })


    function fun1(){
        /// black pawn
        if(document.getElementById(currentID).innerText.charCodeAt(0)=="9823"){
        prevID=currentID;
        var u=currentID.charAt(0);
        var s=currentID.charAt(1);
        if((parseInt(u)+1)<=7 && document.getElementById((parseInt(u)+1).toString()+s).innerHTML=="")
        addGreen((parseInt(u)+1).toString(),s);
        if((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0 && document.getElementById((parseInt(u)+1).toString()+(parseInt(s)-1).toString()).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+(parseInt(u)+1).toString()+(parseInt(s)-1).toString()).attr("class"))
        addGreen((parseInt(u)+1).toString(),(parseInt(s)-1).toString());
        if((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7 && document.getElementById((parseInt(u)+1).toString()+(parseInt(s)+1).toString()).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+(parseInt(u)+1).toString()+(parseInt(s)+1).toString()).attr("class"))
        addGreen((parseInt(u)+1).toString(),(parseInt(s)+1).toString());
        if(parseInt(u)===1 && document.getElementById((parseInt(u)+1).toString()+s).innerHTML==""&& document.getElementById((parseInt(u)+2).toString()+s).innerHTML==""){
            addGreen((parseInt(u)+1).toString(),s);
            addGreen((parseInt(u)+2).toString(),s);
        }
        
        return 0;
        }
        /// white pawn
        else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9817"){
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 && document.getElementById((parseInt(u)-1).toString()+s).innerHTML=="")
            addGreen((parseInt(u)-1).toString(),s);
            if((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0 && document.getElementById((parseInt(u)-1).toString()+(parseInt(s)-1).toString()).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+(parseInt(u)-1).toString()+(parseInt(s)-1).toString()).attr("class"))
            addGreen((parseInt(u)-1).toString(),(parseInt(s)-1).toString());
            if((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7 && document.getElementById((parseInt(u)-1).toString()+(parseInt(s)+1).toString()).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+(parseInt(u)-1).toString()+(parseInt(s)+1).toString()).attr("class"))
            addGreen((parseInt(u)-1).toString(),(parseInt(s)+1).toString());
            if(parseInt(u)===6 && document.getElementById((parseInt(u)-1).toString()+s).innerHTML==""&& document.getElementById((parseInt(u)-2).toString()+s).innerHTML==""){
                addGreen((parseInt(u)-1).toString(),s);
                addGreen((parseInt(u)-2).toString(),s);
            }
        return 2;
        }
        /// boat
        else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9820" || document.getElementById(currentID).innerText.charCodeAt(0)=="9814"){
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7)
            {
                u=parseInt(u)+1;
                if(document.getElementById(u.toString()+s).innerHTML==""){
                addGreen(u.toString(),s);
                if(parseInt(u)==7){
                    b1=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s).attr("class")){
                        b1=(parseInt(u)-1).toString()+s.toString();
                    break;}
                    else{
                        b1=u.toString()+s.toString();
                        addGreen(u.toString(),s);
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 )
            {
                u=parseInt(u)-1;
                if(document.getElementById(u.toString()+s).innerHTML==""){
                addGreen(u.toString(),s);
                if(parseInt(u)==0){
                    b2=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s).attr("class")){
                        b2=(parseInt(u)+1).toString()+s.toString();
                    break;}
                    else{
                        addGreen(u.toString(),s);
                        b2=u.toString()+s.toString();
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(s)-1)>=0)
            {
                
                s=parseInt(s)-1;
                if(document.getElementById(u+s.toString()).innerHTML==""){
                addGreen(u,s.toString());
                if(parseInt(s)==0){
                    b3=u.toString()+(parseInt(s)).toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u+s.toString()).attr("class")){
                        b3=u.toString()+(parseInt(s)+1).toString();
                    break;}
                    else{
                        b3=u.toString()+s.toString();
                        addGreen(u,s.toString());
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while( (parseInt(s)+1)<=7)
            {
                s=parseInt(s)+1;
                if(document.getElementById(u+s.toString()).innerHTML==""){
                addGreen(u,s.toString());
                if(parseInt(s)==7){
                    b4=u.toString()+(parseInt(s)).toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u+s.toString()).attr("class")){
                        b4=u.toString()+(parseInt(s)-1).toString();
                    break;}
                    else{
                        b4=u.toString()+s.toString();
                        addGreen(u,s.toString());
                    break;    
                }
                }
            }
    return 3;
        }

        ///bishop
        else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9821" || document.getElementById(currentID).innerText.charCodeAt(0)=="9815")
        {
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)+1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==7 || parseInt(s)==7){
                    c1=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        c1=(parseInt(u)-1).toString()+(parseInt(s)-1).toString();
                    break;
                    }
                    else{
                        addGreen(u.toString(),s.toString());
                        c1=u.toString()+s.toString();
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)-1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==0 || parseInt(s)==0){
                    c2=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        c2=(parseInt(u)+1).toString()+(parseInt(s)+1).toString();
                        break;}
                    else{
                        addGreen(u.toString(),s.toString());
                        c2=u.toString()+s.toString();
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)+1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==7 || parseInt(s)==0){
                    c3=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        c3=(parseInt(u)-1).toString()+(parseInt(s)+1).toString();
                    break;}
                    else{
                        addGreen(u.toString(),s.toString());
                        c3=u.toString()+s.toString();
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)-1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==0 || parseInt(s)==7){
                    c4=u.toString()+s.toString();
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        c4=(parseInt(u)+1).toString()+(parseInt(s)-1).toString();
                        console.log(q4+"q4")
                    break;}
                    else{  
                        addGreen(u.toString(),s.toString());
                        c4=u.toString()+s.toString();
                    break;    
                }
                }
            }
             return 4;
        }
        /// queen
        else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9819" || document.getElementById(currentID).innerText.charCodeAt(0)=="9813")
        {
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)+1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==7 || parseInt(s)==7){
                    q1=u.toString()+s.toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        q1=(parseInt(u)-1).toString()+(parseInt(s)-1).toString();
                        console.log(q1)
                    break;
                    }
                    else{
                        addGreen(u.toString(),s.toString());
                        q1=u.toString()+s.toString();
                        console.log(q1)
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)-1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==0 || parseInt(s)==0){
                    q2=u.toString()+s.toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        q2=(parseInt(u)+1).toString()+(parseInt(s)+1).toString();
                        console.log(q2)
                        break;}
                    else{
                        addGreen(u.toString(),s.toString());
                        q2=u.toString()+s.toString();
                        console.log(q2)
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)+1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==7 || parseInt(s)==0){
                    q3=u.toString()+s.toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        q3=(parseInt(u)-1).toString()+(parseInt(s)+1).toString();
                        console.log(q3)
                    break;}
                    else{
                        addGreen(u.toString(),s.toString());
                        q3=u.toString()+s.toString();
                        console.log(q3)
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)-1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML==""){
                addGreen(u.toString(),s.toString());
                if(parseInt(u)==0 || parseInt(s)==7){
                    q4=u.toString()+s.toString();
                    console.log(q4+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s.toString()).attr("class")){
                        q4=(parseInt(u)+1).toString()+(parseInt(s)-1).toString();
                        console.log(q4+"q4")
                    break;}
                    else{  
                        addGreen(u.toString(),s.toString());
                        q4=u.toString()+s.toString();
                        console.log("q4"+q4)
                    break;    
                }
                }
            }
            ///////////////////////////////////////////////////
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)+1)<=7)
            {
                u=parseInt(u)+1;
                if(document.getElementById(u.toString()+s).innerHTML==""){
                addGreen(u.toString(),s);
                if(parseInt(u)==7){
                    q5=u.toString()+s.toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s).attr("class")){
                        q5=(parseInt(u)-1).toString()+s.toString();
                        console.log(q5)
                    break;}
                    else{
                        q5=u.toString()+s.toString();
                        addGreen(u.toString(),s);
                        console.log(q5)
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(u)-1)>=0 )
            {
                u=parseInt(u)-1;
                if(document.getElementById(u.toString()+s).innerHTML==""){
                addGreen(u.toString(),s);
                if(parseInt(u)==0){
                    q6=u.toString()+s.toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u.toString()+s).attr("class")){
                        q6=(parseInt(u)+1).toString()+s.toString();
                        console.log(q6)
                    break;}
                    else{
                        addGreen(u.toString(),s);
                        q6=u.toString()+s.toString();
                        console.log(q6)
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while((parseInt(s)-1)>=0)
            {
                
                s=parseInt(s)-1;
                if(document.getElementById(u+s.toString()).innerHTML==""){
                addGreen(u,s.toString());
                if(parseInt(s)==0){
                    q7=u.toString()+(parseInt(s)).toString();
                    console.log(q7+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u+s.toString()).attr("class")){
                        q7=u.toString()+(parseInt(s)+1).toString();
                        console.log(q7+"q7")
                    break;}
                    else{
                        q7=u.toString()+s.toString();
                        addGreen(u,s.toString());
                        console.log(q7+"q7")
                    break;    
                }
                }
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            while( (parseInt(s)+1)<=7)
            {
                s=parseInt(s)+1;
                if(document.getElementById(u+s.toString()).innerHTML==""){
                addGreen(u,s.toString());
                if(parseInt(s)==7){
                    q8=u.toString()+(parseInt(s)).toString();
                    console.log(q8+"q7")
                }
                }
                else
                {
                    if($("#"+currentID).attr("class")==$("#"+u+s.toString()).attr("class")){
                        q8=u.toString()+(parseInt(s)-1).toString();
                        console.log(q8)
                    break;}
                    else{
                        q8=u.toString()+s.toString();
                        addGreen(u,s.toString());
                        console.log(q8)
                    break;    
                }
                }
            }
            
            
            return 5;
           } 

           //// knight
           else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9816" || document.getElementById(currentID).innerText.charCodeAt(0)=="9822")
        {
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 && (parseInt(s)-2)>=0)
            {
                u=parseInt(u)-1;
                s=parseInt(s)-2;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());    
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+1)<=7 && (parseInt(s)-2)>=0)
            {
                u=parseInt(u)+1;
                s=parseInt(s)-2;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());  
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+2)<=7 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)+2;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString()); 
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+2)<=7 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)+2;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());  
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+1)<=7 && (parseInt(s)+2)<=7)
            {
                u=parseInt(u)+1;
                s=parseInt(s)+2;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString()); 
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 && (parseInt(s)+2)<=7)
            {
                u=parseInt(u)-1;
                s=parseInt(s)+2;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-2)>=0 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)-2;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-2)>=0 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)-2;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            return 6;
        }
        //// king
        else if(document.getElementById(currentID).innerText.charCodeAt(0)=="9812" || document.getElementById(currentID).innerText.charCodeAt(0)=="9818")
        {
            prevID=currentID;
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)+1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)-1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
            {
                u=parseInt(u)+1;
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
            {
                u=parseInt(u)-1;
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            ///////////////////////////////////////////////////
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)+1)<=7)
            {
                u=parseInt(u)+1;
               
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(u)-1)>=0 )
            {
                u=parseInt(u)-1;
                
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if((parseInt(s)-1)>=0)
            {
                
                s=parseInt(s)-1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            var u=currentID.charAt(0);
            var s=currentID.charAt(1);
            if( (parseInt(s)+1)<=7)
            {
                s=parseInt(s)+1;
                if(document.getElementById(u.toString()+s.toString()).innerHTML=="" || $("#"+currentID).attr("class")!=$("#"+u.toString()+s.toString()).attr("class"))
                addGreen(u.toString(),s.toString());
            }
            return 7;
           } 

        else{
            currentID="";
            prevID="";
            return 1;  
        }

    }




    /// function for guties

    function bpawn(){
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        removeGreen((parseInt(u)+1).toString(),s.toString());
        removeGreen((parseInt(u)+2).toString(),s.toString());
        removeGreen((parseInt(u)+1).toString(),(parseInt(s)-1).toString())
        removeGreen((parseInt(u)+1).toString(),(parseInt(s)+1).toString())
        if(currentID==(parseInt(u)+1).toString()+s.toString() && document.getElementById(currentID).innerHTML=="")
        {
          Empty(currentID,prevID);
          if(flag=="white")
          flag="black"
          else
          flag="white"
          return 1;
        }
        if(currentID==(parseInt(u)+2).toString()+s.toString() && document.getElementById(currentID).innerHTML=="")
        {
          Empty(currentID,prevID);
          if(flag=="white")
          flag="black"
          else
          flag="white"
          return 1;
        }
        else if(currentID==(parseInt(u)+1).toString()+(parseInt(s)-1).toString() && document.getElementById(currentID).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+prevID).attr("class"))
        {
            nonEmpty(currentID,prevID);
            if(flag=="white")
          flag="black"
          else
          flag="white"
            return 1;
        }
        else if(currentID==(parseInt(u)+1).toString()+(parseInt(s)+1).toString() && document.getElementById(currentID).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+prevID).attr("class"))
        {
            nonEmpty(currentID,prevID);
            if(flag=="white")
          flag="black"
          else
          flag="white"
            return 1;
        }
        else{
            
        return 1;
        }
    }


    function wpawn(){
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        removeGreen((parseInt(u)-1).toString(),s.toString());
        removeGreen((parseInt(u)-2).toString(),s.toString());
        removeGreen((parseInt(u)-1).toString(),(parseInt(s)-1).toString())
        removeGreen((parseInt(u)-1).toString(),(parseInt(s)+1).toString())
        if(currentID==(parseInt(u)-1).toString()+s.toString() && document.getElementById(currentID).innerHTML=="")
        {
          Empty(currentID,prevID);
          if(flag=="white")
          flag="black"
          else
          flag="white"
          return 1;
        }
        if(currentID==(parseInt(u)-2).toString()+s.toString() && document.getElementById(currentID).innerHTML=="")
        {
          Empty(currentID,prevID);
          if(flag=="white")
          flag="black"
          else
          flag="white"
          return 1;
        }
        else if(currentID==(parseInt(u)-1).toString()+(parseInt(s)-1).toString() && document.getElementById(currentID).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+prevID).attr("class"))
        {
            nonEmpty(currentID,prevID);
            if(flag=="white")
          flag="black"
          else
          flag="white"
            return 1;
        }
        else if(currentID==(parseInt(u)-1).toString()+(parseInt(s)+1).toString() && document.getElementById(currentID).innerHTML!="" && $("#"+currentID).attr("class")!=$("#"+prevID).attr("class"))
        {
            nonEmpty(currentID,prevID);
            if(flag=="white")
          flag="black"
          else
          flag="white"
            return 1;
        }
        else{
        return 1;
        }
    }


    function boat(){
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)+1)<=parseInt(b1.charAt(0)))
            {
                u=parseInt(u)+1;
                removeGreen(u.toString(),s)
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)-1)>=parseInt(b2.charAt(0)) )
            {
                u=parseInt(u)-1;
                
                removeGreen(u.toString(),s)
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(s)-1)>=parseInt(b3.charAt(1)))
            {
                
                s=parseInt(s)-1;
                removeGreen(u,s.toString())
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while( (parseInt(s)+1)<=parseInt(b4.charAt(1)))
            {
                s=parseInt(s)+1;
                removeGreen(u,s.toString())
                check(currentID,prevID,u,s);
            }
            b1="",b2="",b3="",b4="";
        return 1;
    }
    



    function bishop(){
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        while((parseInt(u)+1)<=parseInt(c1.charAt(0)) && (parseInt(s)+1)<=parseInt(c1.charAt(1)))
        {
            u=parseInt(u)+1;
            s=parseInt(s)+1;
            removeGreen(u.toString(),s.toString())
            check(currentID,prevID,u,s);
        }
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        while((parseInt(u)-1)>=parseInt(c2.charAt(0)) && (parseInt(s)-1)>=parseInt(c2.charAt(1)))
        {
            u=parseInt(u)-1;
            s=parseInt(s)-1;
            removeGreen(u.toString(),s.toString())
            check(currentID,prevID,u,s);
        }
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        while((parseInt(u)+1)<=parseInt(c3.charAt(0)) && (parseInt(s)-1)>=parseInt(c3.charAt(1))){
            u=parseInt(u)+1;
            s=parseInt(s)-1;
            removeGreen(u.toString(),s.toString())
            check(currentID,prevID,u,s);
        }
        var u=prevID.charAt(0);
        var s=prevID.charAt(1);
        while((parseInt(u)-1)>=parseInt(c4.charAt(0)) && (parseInt(s)+1)<=parseInt(c4.charAt(1)))
        {
            u=parseInt(u)-1;
            s=parseInt(s)+1;
            removeGreen(u.toString(),s.toString())
            check(currentID,prevID,u,s);
        }
        c1="",c2="",c3="",c4="";
        return 1;      
    }


    /////////////////////////////////////////////////////////////////////////

    function queen(){
        console.log(q1+":"+q2+":"+":"+q3+":"+q4+":"+q5+":"+q6+":"+q7+":"+q8)
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)+1)<=parseInt(q1.charAt(0)) && (parseInt(s)+1)<=parseInt(q1.charAt(1)))
            {
                u=parseInt(u)+1;
                s=parseInt(s)+1;
                removeGreen(u.toString(),s.toString())
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)-1)>=parseInt(q2.charAt(0)) && (parseInt(s)-1)>=parseInt(q2.charAt(1)))
            {
                u=parseInt(u)-1;
                s=parseInt(s)-1;
                removeGreen(u.toString(),s.toString())
               
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)+1)<=parseInt(q3.charAt(0)) && (parseInt(s)-1)>=parseInt(q3.charAt(1))){
                u=parseInt(u)+1;
                s=parseInt(s)-1;
                removeGreen(u.toString(),s.toString())
                
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)-1)>=parseInt(q4.charAt(0)) && (parseInt(s)+1)<=parseInt(q4.charAt(1)))
            {
                u=parseInt(u)-1;
                s=parseInt(s)+1;
                removeGreen(u.toString(),s.toString())
               
                check(currentID,prevID,u,s);
            }
            ///////////////////////////////////////////////////
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)+1)<=parseInt(q5.charAt(0)))
            {
                u=parseInt(u)+1;
                removeGreen(u.toString(),s)
                
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(u)-1)>=parseInt(q6.charAt(0)) )
            {
                u=parseInt(u)-1;
                
                removeGreen(u.toString(),s)
                
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while((parseInt(s)-1)>=parseInt(q7.charAt(1)))
            {  
                s=parseInt(s)-1;
                removeGreen(u,s.toString())
                
                check(currentID,prevID,u,s);
            }
            var u=prevID.charAt(0);
            var s=prevID.charAt(1);
            while( (parseInt(s)+1)<=parseInt(q8.charAt(1)))
            {
                s=parseInt(s)+1;
                removeGreen(u,s.toString())
                
                check(currentID,prevID,u,s);
            }
            q1="",q2="",q3="",q4="",q5="",q6="",q7="",q8=""
            return 1
        }
           


/// knight function
function knight(){
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-2;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }           
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-2;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+2;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+2;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+2;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+2;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-2;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-2;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        check(currentID,prevID,u,s);
    }
    return 1;
    }

    /// king
    function king(){
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {   
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
            ///////////////////////////////////////////////////
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
               
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 )
    {
        u=parseInt(u)-1;
                
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(s)-1)>=0)
    {
                
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if( (parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        KingTracker(prevID,u,s)
        check(currentID,prevID,u,s);
    }      
    return 1;
}
        
        
function addGreen(i,j){
    $("#"+i+j).css({
        "background-color":"rgba(35, 168, 30,0.4)",
        "border-radius":"50%",
        "color":"#ff0000",
        
    })
}
function removeGreen(i,j){
    $("#"+i+j).css({
        "background-color":"",
        "border-radius":"",
        "opacity":"1",
        "color":"",
    })
}


function Empty(currentID,prevID)
{   document.getElementById("myAudio").play()
    var z=document.getElementById(prevID).innerHTML;
    document.getElementById(currentID).innerHTML=z;
    document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
    document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"));
    document.getElementById(prevID).innerHTML=""; 
   if(wkingcheck(whiteKingPos) && flag=="white")
   {   console.log("white king check")
       alert("white king check")
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=""
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+prevID).attr("class"))
       flag="black"    
   }
   if(flag=="black" && bkingcheck(blackKingPos))
   {console.log("black king check")
    alert("black king check")
    document.getElementById(prevID).innerHTML=z;
    document.getElementById(currentID).innerHTML=""
    document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
    document.getElementById(currentID).classList.remove($("#"+prevID).attr("class"))
    flag="white"
   }
}


function nonEmpty(currentID,prevID)
{   document.getElementById("myAudio").play() 
    var z=document.getElementById(prevID).innerHTML;
    var y=document.getElementById(currentID).innerHTML;
    document.getElementById(currentID).innerHTML=z;
    document.getElementById(prevID).innerHTML=""
    document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))
    document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
    document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"))

  if(wkingcheck(whiteKingPos) && flag=="white")
   {   console.log("white king check")
       alert("white king check")
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=y;
       document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"))   
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))   
       document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
       flag="black"
   }
   if(bkingcheck(blackKingPos) && flag=="black")
   {   console.log("black king check")
       alert("black king check")
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=y;
       document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"))   
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))   
       document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
       flag="white"
   }

}


function check(currentID,prevID,u,s)
{   
    if(currentID==u.toString()+s.toString())
    {
        if(document.getElementById(currentID).innerHTML!=""){
            if($("#"+currentID).attr("class")!=$("#"+prevID).attr("class"))
            {
             nonEmpty(currentID,prevID);
             if(flag=="white")
             flag="black"
             else
             flag="white";
            }
            return 1;
        }
        else{
            Empty(currentID,prevID);
            if(flag=="white")
             flag="black"
             else
             flag="white";
             return 1;
            }
    }
}

function KingTracker(prevID,u,s){
    if(document.getElementById(prevID).innerText.charCodeAt(0)=="9812"  ){
       
        whiteKingPos=u.toString()+s.toString();

    }else if(document.getElementById(prevID).innerText.charCodeAt(0)=="9818"){

        blackKingPos=u.toString()+s.toString();
    }
}


function wkingcheck(whiteKingPos){
    console.log(whiteKingPos)
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(currentID).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(u)-1)>=0)
    {
        u=parseInt(u)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(currentID).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(currentID).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    while((parseInt(s)-1)>=0)
    {
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(currentID).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }    
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-2;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }  
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-2;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+2;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+2;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9822"))
            {
             return true;
            }
        }
    } 
    return false;  
}
function bkingcheck(blackKingPos){
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(u)-1)>=0)
    {
        u=parseInt(u)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    while((parseInt(s)-1)>=0)
    {
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-2)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+2)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+2;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }    
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-2;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }  
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)-2)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-2;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+2;
        s=parseInt(s)-1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    if((parseInt(u)+2)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+2;
        s=parseInt(s)+1;
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9816"))
            {
             return true;
            }
        }
    }
    return false;   

}