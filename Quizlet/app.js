let qnum = 0;
keylist = []
let blacklist = [];
let answerlist = new Array();
let submissionlist = new Array();
let deck = new Array();
let answervalue = null;
let qID = 0;

const load = `<div class="card" style="padding:25px;"> <h2>Loading...</h2></div>`
const generror = `<div class="card"style="padding:25px;"> <h2>Unable to generate additional questions</h2></div>`
const mainitem = document.querySelector(".quizlet");
const subitem = document.querySelector(".ak");
function quizInit(){
    document.querySelector(".initbutton").hidden = true;
    mainitem.innerHTML = load;
    subitem.hidden = false;
    subitem.innerHTML = `<div class="card" style="max-width:425px; max-height:450px; width:auto; overflow-y:auto; "> <h2 style="text-align:center; padding: 10px;"> Answers </h2> <br> <ul class="inputs" style="padding: 20px;"> </ul></div>`
    console.log(subitem.innerHTML);
    let pullAnswers = new Promise((resolve, reject) => { 
    const xhr = new XMLHttpRequest();
    
    xhr.open("GET","key.json",true);
    xhr.onload = function(){

        console.log("status",this.status);
        if (this.status === 200){
            //alert("success");
            const answerresponse = JSON.parse(this.responseText);
            answerresponse.forEach(function(questioninfo){
                //alert(questioninfo);
            answerlist.push([questioninfo.keyid,questioninfo.Option1,questioninfo.Option2,questioninfo.Option3,questioninfo.Option4,questioninfo.CorrectAnswer,questioninfo.Notes,questioninfo.Question])
            });
            resolve(answerlist.length);
        }
  

    }
    xhr.send();
 

});

    pullAnswers.then(function(){
    //alert(answerlist.length);
    alist = document.querySelector(".inputs");
    alert(alist);
    initdeck();
    mainitem.innerHTML = determinequestion();
      
    document.querySelector(".nextquestion").addEventListener("click",next)
 
});
console.log(answerlist);
}
function initdeck(){
    for (j=0; j<answerlist.length; j++){
        deck.push(parseInt(j));
        }
        console.log("deck",deck);

}
function next(e){
    answervalue =null
    answers=document.getElementsByName(`A${qnum}`)
    for (i=0; i<answers.length; i++){
        if(answers[i].checked){
        answervalue = answers[i].value;
        }
    }
    if (answervalue === null){
        alert("Please select an answer!");
        e.preventDefault()
    } else{
        console.log(answervalue);
        console.log("answer",deck[qID][5]);
        console.log("CA",answerlist[deck[qID]][5]);
        console.log(answerlist[deck[qID]][parseInt(answerlist[deck[qID]][5])]);

        if (answervalue== answerlist[deck[qID]][parseInt(answerlist[deck[qID]][5])]) {
        mainitem.innerHTML += `<br ><div class="card"> <h4 style="background-color: cornflowerblue;">${answerlist[qID][6]}</h4></div>`;  
        document.querySelector(".nextquestion").hidden="true";
        alist.innerHTML += `<li style="background-color:mediumturquoise;">${answervalue}</li>`;
        alist.innerHTML +=  `<ul style="list-style-type:circle;"><li style="background-color: cornflowerblue;">${answerlist[qID][6]}</li></ul>`
        deck.splice(qID,1);
        setTimeout(function(){
            mainitem.innerHTML = load; 
            //alert(answervalue);
            submissionlist.push([qID,answervalue]);
            //alert(answerlist);
            //setTimeout(determinequestion,2000);
            let loadQuestion = new Promise((resolve, reject) => { 
                mainitem.innerHTML = determinequestion();
                resolve("Replaced");
            });
            loadQuestion.then(function(){
                if(mainitem.innerHTML != generror){
                    document.querySelector(".nextquestion").addEventListener("click",next);
                }
            });
        },2000);
        }else{
            alert("Try again");
            if (!alist.innerHTML.includes(`<li style="background-color:maroon;">${answervalue}</li>`)){
            alist.innerHTML+= `<li style="background-color:maroon;">${answervalue}</li>`
            }
            e.preventDefault()
        }
    }
}
function determinequestion(){
    console.log("deck",deck);
    qID = parseInt(Math.random()*deck.length);
    console.log("QID",qID);
    if (deck.length == 0){
        return generror;
    }else
    {
    if (deck.length >=1 & deck.indexOf(deck[qID]) != -1)
    {
    quns =[];
    qsort=[];
    //alert(qID);
    qnum +=1;
//    console.log("AL1",answerlist[1]);
//    console.log("AL0",answerlist[0]);
//    console.log("AL",answerlist);
//    console.log("ALT",typeof(answerlist));
    quns=    [`<input type="radio" name="A${qnum}" id="O1" value="${answerlist[deck[qID]][1]}"> <label for="O1"> ${answerlist[deck[qID]][1]}</label><br>`,`<input type="radio" name="A${qnum}" id="O2" value="${answerlist[deck[qID]][2]}"> <label for="O2"> ${answerlist[deck[qID]][2]}</label><br>`,`<input type="radio" name="A${qnum}" id="O3" value="${answerlist[deck[qID]][3]}"> <label for="O3"> ${answerlist[deck[qID]][3]}</label><br>`,`<input type="radio" name="A${qnum}" id="O4" value="${answerlist[deck[qID]][4]}"> <label for="O4"> ${answerlist[deck[qID]][4]}</label><br>`];
    qsort = quns.sort(()=> Math.random() -0.5);
    alist.innerHTML+=`<h7>Question ${qnum} : <br> ${answerlist[deck[qID]][7]}</h7>`
    return `
<div class="card" style="padding:25px;">
    <h2>Question ${qnum} : ${answerlist[deck[qID]][7]}</h2>
    <form>
    <br>
    ${qsort[0]}
    ${qsort[1]}
    ${qsort[2]}
    ${qsort[3]}
    <br>
    <div style="text-align:center;"> <Button class="btn btn-success nextquestion">submit</button></div>
</form> 
</div>
`
}
}
}
