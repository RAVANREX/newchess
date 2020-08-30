

    var currentID="",prevID="",q1="",q2="",q3="",q4="",q5="",q6="",q7="",q8="";
    var b1="",b2="",b3="",b4="";
    var c1="",c2="",c3="",c4="";

    var w=document.getElementById("74").innerHTML;
    var b=document.getElementById("04").innerHTML;
    var whiteKingPos="74",blackKingPos="04";
    var functionSelecter=1;
    var flag="white";
    var i=11,j=0,k=1,l=8;
    let gamemode = "null"
    var playerNum = 0
    let ready=false
    let enemyready=false
    let currentplayer="user"
    var playingplayer=0
    const startButton=document.querySelector('#start')
 
    const setupButtons=document.getElementById('setup-buttons')




    const socket=io();
      
    
    //get your player number
    socket.on('player-number',num =>{
        console.log(`we habe git this number ${num}`)
        
       
    if(num==-1)
    {
        $("#msg").dialog({});
    }
   else{
    playerNum=parseInt(num)
    if(playerNum==1){
        currentplayer="enemy"
        ////// suman edided to rotate board
        $("#box").addClass("rotate");
        $(".inside").addClass("rotate");
        $("#left").addClass("rotate");
        $("#right").addClass("rotate");

    }
    console.log(playerNum)

    /////////
    //get other player status
    socket.emit('check-players')
    ////////
    }
}) 



//another player has connected or disconnected
socket.on('player-connection', num=>{
    console.log(`player number ${num} has connected or disconnected `)
    playerconnectedordisconnected(num)
   })

///////////////
//on enemy ready
socket.on('enemy-ready',num =>{
    enemyready=true
    playerReady(num)
    if(ready){
        playGameMulti(socket)
        setupButtons.style.display='none'

    }
})

////////////////


//check player status
socket.on('check-players',players =>{
    players.forEach((p,  i)=>{
        if(p.connected) playerconnectedordisconnected(i)
        if(p.ready){
            playerReady(i)
            if(i!==playerNum) enemyready=true
        }
    })
})



///ready bitton click
startButton.addEventListener('click',()=>{
    playGameMulti(socket)
})


function playerconnectedordisconnected(num){
      let player=`.p${parseInt(num)+1}`
      document.querySelector(`${player} .connected`).classList.toggle('active')
       if(parseInt(num)==playerNum){
       document.querySelector(player).style.fontWeight='bold'
       }
   }

   function playerReady(num){
    let player=`.p${parseInt(num) +1}`
    document.querySelector(`${player} .ready`).classList.toggle('active')
    
}

   function playGameMulti(socket){
       setupButtons.style.display='none'
       if(!ready){
           socket.emit('player-ready') 
           ready=true
           playerReady(playerNum)
       }
   }

   
   
   socket.on('player-number',num=>{
       console.log(num+" vitore")
       
    $("div").click(function(e){
        e.preventDefault()
        console.log(this.id)
        console.log("num="+num+"ready="+ready+"enemyready="+enemyready)
        if(num==0 && (!ready || !enemyready))
        alert("please tell your friend to be ready")
        else{
        if(num==0 && flag=="white"){
        startchess(this.id)
        }
        if(num==1 && flag=="black"){
            startchess(this.id) 
        }
    }
    })



})

    
        socket.on('reciv', send=>{
            console.log(`this data is recived from client ${send}`)
            startchess(send[1])
            startchess(send[0])
            })
    
    
    function startchess(currentID){
        console.log(`this in your current id your arae palyer ${playingplayer}`)
        console.log(`////// currentid holo ${currentID}`)
        console.log(`previd holo ${prevID}\\\\\\\\`)
        
    
  

         if(functionSelecter==1){
            if(flag=="white" && $("#"+currentID).attr("class")=="white")
            functionSelecter=fun1(currentID);
            else if(flag=="black" && $("#"+currentID).attr("class")=="black")
            functionSelecter=fun1(currentID);
        }else if(functionSelecter==0){
            if(flag=="black")
            functionSelecter=bpawn(currentID);
        }else if(functionSelecter==2){
            if(flag=="white")
            functionSelecter=wpawn(currentID);
        }else if(functionSelecter==3){
            functionSelecter=boat(currentID);
        }else if(functionSelecter==4){
            functionSelecter=bishop(currentID);
        }else if(functionSelecter==5){
            functionSelecter=queen(currentID);
        }else if(functionSelecter==6){
            functionSelecter=knight(currentID);
        }else if(functionSelecter==7){
            functionSelecter=king(currentID);
        }

    
///////////
    }

    function fun1(currentID){
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

    function bpawn(currentID){
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


    function wpawn(currentID){
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


    function boat(currentID){
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
    



    function bishop(currentID){
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

    function queen(currentID){
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
function knight(currentID){
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
    function king(currentID){
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {   
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
        
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
       
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
        
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
       
    }
            ///////////////////////////////////////////////////
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
               
        removeGreen(u.toString(),s.toString())
       
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 )
    {
        u=parseInt(u)-1;
                
        removeGreen(u.toString(),s.toString())
       
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(s)-1)>=0)
    {
                
        s=parseInt(s)-1;
        removeGreen(u.toString(),s.toString())
       
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if( (parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        removeGreen(u.toString(),s.toString())
      
    }      
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {   
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
         KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
            ///////////////////////////////////////////////////
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
               
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(u)-1)>=0 )
    {
        u=parseInt(u)-1;
                
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if((parseInt(s)-1)>=0)
    {
                
        s=parseInt(s)-1;
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
    }
    var u=prevID.charAt(0);
    var s=prevID.charAt(1);
    if( (parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        KingTracker(prevID,u,s)
        if(check(currentID,prevID,u,s))return 1;
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
{   var x=1;
    var z=document.getElementById(prevID).innerHTML;
    document.getElementById(currentID).innerHTML=z;
    document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
    document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"));
    document.getElementById(prevID).innerHTML=""; 
    console.log(whiteKingPos)
    var cflag=flag;
    var wflag=wkingcheck(whiteKingPos);
    var bflag=bkingcheck(blackKingPos);
   if(flag=="white" && wflag)
   {   
       x=0;
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=""
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+prevID).attr("class"))
       flag="black"
       if(z==w){
         whiteKingPos=prevID; }   
   }
   else if(flag=="black" && bflag)
   {
       x=0;
    document.getElementById(prevID).innerHTML=z;
    document.getElementById(currentID).innerHTML=""
    document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
    document.getElementById(currentID).classList.remove($("#"+prevID).attr("class"))
    flag="white"
    if(z==b){
       blackKingPos=prevID; 
    }
   }
   

  if((cflag=="white" && !wflag) ||(cflag=="black" && !bflag)){ var send = [currentID,prevID]
socket.emit('sender', send)
console.log("ami esagacchi bay of bengal")}
if(x==1)
   document.getElementById("myAudio").play()
   else
   document.getElementById("alert").play()
}


function nonEmpty(currentID,prevID)
{   var x=1;
    var z=document.getElementById(prevID).innerHTML;
    var y=document.getElementById(currentID).innerHTML;
    document.getElementById(currentID).innerHTML=z;
    document.getElementById(prevID).innerHTML=""
    var n=$("#"+currentID).attr("class")
    document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))
    document.getElementById(currentID).classList.add($("#"+prevID).attr("class"));
    document.getElementById(prevID).classList.remove($("#"+prevID).attr("class"))
    console.log(whiteKingPos)
    var bflag=bkingcheck(blackKingPos);
    var wflag=wkingcheck(whiteKingPos)
    if(flag=="white" && !wflag)
    {
        document.getElementById(k.toString()+l.toString()).innerHTML=y;
        if(k+1<=8)
        k++
        else{
        l++;
        k=1;
        }
    }
    else if(flag=="black" && !bflag){
        document.getElementById(i.toString()+j.toString()).innerHTML=y;
        if(i+10<=81)
        i+=10
        else{
        j++;
        i=11;
        }

    }
    var cflag=flag;
   
  if(flag=="white" && wflag)
   {x=0;
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=y;   
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))   
       document.getElementById(currentID).classList.add(n);
       flag="black"
       console.log(z)
       if(z==w){
       whiteKingPos=prevID;
       }
   }
   else if(flag=="black" && bflag)
   {x=0;
       document.getElementById(prevID).innerHTML=z;
       document.getElementById(currentID).innerHTML=y;  
       document.getElementById(prevID).classList.add($("#"+currentID).attr("class"));
       document.getElementById(currentID).classList.remove($("#"+currentID).attr("class"))   
       document.getElementById(currentID).classList.add(n);
       flag="white"
       if(z==b){
       blackKingPos=prevID;
       }
   }
   


  if((cflag=="white" && !wflag) ||(cflag=="black" && !bflag)) {var send = [currentID,prevID]
socket.emit('sender', send)
console.log("ami esagacchi bay of bengal")}
if(x==1)
   document.getElementById("myAudio").play()
   else
   document.getElementById("alert").play()

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
            return true;
        }
        else{
            Empty(currentID,prevID);
            if(flag=="white")
             flag="black"
             else
             flag="white";
             return true;
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
    
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(1)
    var count=0;
    while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(2)
    count=0;
    while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        count++;
        if(count==1 && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9823"))
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(3)
    count=0;
    while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(4)
    count=0;
    while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        count++;
        if(count==1 && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9823"))
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9821"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(5)
    count=0;
    while((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(6)
    count=0;
    while((parseInt(u)-1)>=0)
    {
        u=parseInt(u)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(7)
    count=0
    while((parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(8)
    count=0
    while((parseInt(s)-1)>=0)
    {
        s=parseInt(s)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9818")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="white" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9819" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9820"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=whiteKingPos.charAt(0);
    s=whiteKingPos.charAt(1);
    console.log(9)
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
    console.log(10)
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
    console.log(11)
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
    console.log(12)
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
    count=0;
    while((parseInt(u)+1)<=7 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)+1;
        s=parseInt(s)+1;
        count++;
        if(count==1 && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9817"))
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0;
    while((parseInt(u)-1)>=0 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)-1;
        s=parseInt(s)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0;
    while((parseInt(u)+1)<=7 && (parseInt(s)-1)>=0)
    {
        u=parseInt(u)+1;
        s=parseInt(s)-1;
        count++;
        if(count==1 && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9817"))
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0
    while((parseInt(u)-1)>=0 && (parseInt(s)+1)<=7)
    {
        u=parseInt(u)-1;
        s=parseInt(s)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9815"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0;
    while((parseInt(u)+1)<=7)
    {
        u=parseInt(u)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0;
    while((parseInt(u)-1)>=0)
    {
        u=parseInt(u)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0;
    while((parseInt(s)+1)<=7)
    {
        s=parseInt(s)+1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            else
            break;
        }
    }
    u=blackKingPos.charAt(0);
    s=blackKingPos.charAt(1);
    count=0
    while((parseInt(s)-1)>=0)
    {
        s=parseInt(s)-1;
        count++;
        if(count==1 && document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9812")
        {
          return true;
        }
        if(document.getElementById(u.toString()+s.toString()).innerHTML!="")
        {
            if($("#"+u.toString()+s.toString()).attr("class")!="black" && (document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9813" || document.getElementById(u.toString()+s.toString()).innerText.charCodeAt(0)=="9814"))
            {
             return true;
            }
            else
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