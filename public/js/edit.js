function cong(){
    var value= document.getElementById("value").value;
    if(value<10){
        value++;
    }
    else value=10;
    document.getElementById("value").value=value;
}
function tru(){
    var value= document.getElementById("value").value;
    if(value>1){
        value--;
    }
    else value=1;
    document.getElementById("value").value=value;
}

var mainImg=document.getElementById("main-img");
var subImg = document.getElementsByClassName("sub-img");
subImg[0].onclick=function(){
    mainImg.src = subImg[0].src;
}
subImg[1].onclick=function(){
    mainImg.src = subImg[1].src;
}
subImg[2].onclick=function(){
    mainImg.src = subImg[2].src;
}
subImg[3].onclick=function(){
    mainImg.src = subImg[3].src;
}