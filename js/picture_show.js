/* JavaScript Document*/

/*list of block size combination*/
sizeList=[[160,160*100/160], [200,200*100/160], [320,200]]

/*size of small square*/
var widthSmallSquare
var heightSmallSquare

/*size of big square*/
var widthBigSquare
var heightBigSquare

var maxNumOfBigSquareInARow

/*size of indence*/
var indence = 10

/*size of padding*/
var padding = 15

var maxHeightWidthRatioForNormalSize
var maxWidthHeightRatioForNormalSize

/*global variable for the counter ID*/
var counter

/*left position of each div of image*/
var left=padding

var hasImageInRow=false

/*top position of each div of image*/
var topp=padding

var topRelative

var maxOfLeft

/*count total row number*/
var rowNumber

var lastWidth


/*file name array*/
var picNameArray = ["0 (2).jpg", "1 (2).jpg", "10 (2).jpg", "10.jpg", "11 (2).jpg", "11.jpg", "12 (2).jpg", "12.jpg", "13 (2).jpg", "13.jpg", "14 (2).jpg", "14.jpg", "15 (2).jpg", "15.jpg", "16 (2).jpg", "16.jpg", "17 (2).jpg", "18 (2).jpg", "18.jpg", "19 (2).jpg", "19.jpg", "2 (2).jpg", "2.jpg", "20 (2).jpg", "20.jpg", "21 (2).jpg", "22 (2).jpg", "24 (2).jpg", "26 (2).jpg", "27 (2).jpg", "3 (2).jpg", "4 (2).jpg", "43 (2).jpg", "46 (2).jpg", "47.jpg", "48.jpg", "49.jpg", "5.jpg", "7 (2).jpg", "8 (2).jpg", "8.jpg", "9 (2).jpg", "9.jpg" ]

var n=picNameArray.length


/*global array of divs of images*/
var divArray=[]

/*initiazie div array*/
initialize()


function fillContainer(){
  for(i=0;i<divArray.length;i++){
    resize(i)
    document.getElementById('image_container').appendChild(divArray[i])
  }
}

function initialize(){
  randomShuffle()
  idx=Math.round(Math.random()*(sizeList.length-1))
  /*size of small square*/
  widthSmallSquare = sizeList[idx][0]
  heightSmallSquare = sizeList[idx][1]
  
  alert(window.screen.width + ", "+window.screen.height)
  if(window.screen.width<window.screen.height){
    widthSmallSquare = (window.screen.width-2*padding-indence-20)/2
    heightSmallSquare = widthSmallSquare/160*100
  }
  widthBigSquare = 2*widthSmallSquare+indence
  heightBigSquare = 2*heightSmallSquare+indence
  maxHeightWidthRatioForNormalSize = heightBigSquare/widthBigSquare*1.5
  maxWidthHeightRatioForNormalSize = widthBigSquare/heightBigSquare*1.5
  maxNumOfBigSquareInARow = Math.floor(window.screen.width/widthBigSquare)
  maxOfLeft=(widthBigSquare+indence)*(maxNumOfBigSquareInARow-1)+padding+widthSmallSquare+indence
  
  topRelative=0
  rowNumber=0
  lastWidth=0
  
  for(i=0; i<picNameArray.length; i++){
    var img=document.createElement('img')
    img.id=i+""
    //img.style.cssText="width:"+row_array[k]+"px; height:"+row_array[k]+"px";
    img.src='image\\'+picNameArray[i]

    var image_layer=document.createElement('div')
    image_layer.setAttribute('class',"image_layer")
    //image_layer.style.width=row_array[k]+"px"
    //image_layer.style.height=row_array[k]+"px"
    image_layer.setAttribute('onmouseover','showlayer(this)')
    image_layer.setAttribute('onmouseout','hidelayer(this)')
    image_layer.setAttribute('onclick','pos(this)')

    var div=document.createElement('div')
    div.setAttribute('class','image')
    //div.style.cssText="width:"+row_array[k]+"px; height:"+row_array[k]+"px; left:"+left+"px; top:"+topp+"px;";

    
    div.appendChild(img)
    div.appendChild(image_layer)
    
    divArray.push(div)
  }
}


function nextPos(width, height){
  if(topRelative==0){
    if(height==heightSmallSquare){
      topp+=heightSmallSquare+indence
      topRelative=1
    }else{
      left+=width+indence
    }
  }else{
    if(lastWidth==widthBigSquare){
      if(width==widthBigSquare){
        topp-=heightSmallSquare+indence
        topRelative=0
        left+=widthBigSquare+indence
      }else{
        left+=widthSmallSquare+indence
      }
    }else{
      left+=widthSmallSquare+indence
      topp-=heightSmallSquare+indence
      topRelative=0
    }
  }
  
  hasImageInRow=true
  if(left>maxOfLeft){
    left=padding
    topp+=heightBigSquare+indence
    rowNumber++
    hasImageInRow=false
  }
  lastWidth=width
  lastHeight=height
}


function resize(i){
  if(topRelative==0){
    resizeFromTop(i)
  }else{
    resizeFromMiddle(i)
  }
}

function resizeFromMiddle(i){
  var width
  var height
  if(lastWidth==widthBigSquare){   //上一个是水平长条
    k=i-1
    do{
      k++
      img=divArray[k].children[0]
      imgWidth=img.naturalWidth
      imgHeight=img.naturalHeight
    }while(imgHeight/imgWidth>maxHeightWidthRatioForNormalSize && k<n-1)
      
    if(imgHeight/imgWidth<=maxHeightWidthRatioForNormalSize){
      var div=divArray[k]
      divArray[k]=divArray[i]
      divArray[i]=div
      
      if(imgWidth/imgHeight>maxWidthHeightRatioForNormalSize){
        width=widthBigSquare
      }else{
        width=widthSmallSquare
      }
      height=heightSmallSquare
    }else{
      nextPos(widthBigSquare,heightSmallSquare)
      resizeFromTop(i)
      return
    }
  }else{  //上一个是小方块
    k=i-1
    do{
      k++
      img=divArray[k].children[0]
      imgWidth=img.naturalWidth
      imgHeight=img.naturalHeight
    }while((imgHeight/imgWidth>maxHeightWidthRatioForNormalSize || imgWidth/imgHeight>maxWidthHeightRatioForNormalSize) && k<n-1)
      
    if(imgHeight/imgWidth<=maxHeightWidthRatioForNormalSize && imgWidth/imgHeight<=maxWidthHeightRatioForNormalSize){
      var div=divArray[k]
      divArray[k]=divArray[i]
      divArray[i]=div
      
      width=widthSmallSquare
      height=heightSmallSquare
    }else{
      nextPos(widthSmallSquare,heightSmallSquare)
      resizeFromTop(i)
      return
    }
  }
  
  div.children[0].style.cssText="width:"+width+"px; height:"+height+"px";
  div.style.cssText="left:"+left+"px; top:"+topp+"px;";
  div.children[1].style.cssText="width:"+width+"px; height:"+height+"px";
  nextPos(width,height)
}


function resizeFromTop(i){
  var width
  var height
  if(left<maxOfLeft){
    var div=divArray[i]
    img=div.children[0]
    imgWidth=img.naturalWidth
    imgHeight=img.naturalHeight
    if(imgWidth/imgHeight>maxWidthHeightRatioForNormalSize){
      width=widthBigSquare
      height=heightSmallSquare
    }else if(imgHeight/imgWidth>maxHeightWidthRatioForNormalSize){
      width=widthSmallSquare
      height=heightBigSquare
    }else{
      if(Math.round(Math.random())==0){
        width=widthSmallSquare
        height=heightSmallSquare
      }else{
        width=widthBigSquare
        height=heightBigSquare
      }
    }
  }else{    //到达一行的末尾
    k=i-1
    do{
      k++
      img=divArray[k].children[0]
      imgWidth=img.naturalWidth
      imgHeight=img.naturalHeight
    }while(imgWidth/imgHeight>maxWidthHeightRatioForNormalSize && k<n-1)
      
    if(imgWidth/imgHeight<=maxWidthHeightRatioForNormalSize){
      var div=divArray[k]
      divArray[k]=divArray[i]
      divArray[i]=div
      
      width=widthSmallSquare
      if(imgHeight/imgWidth>=maxHeightWidthRatioForNormalSize){
        height=heightBigSquare
      }else{
        height=heightSmallSquare
      }
    }else{
      nextPos(widthSmallSquare,heightBigSquare)
      resizeFromTop(i)
      return
    }
  }
  div.children[0].style.cssText="width:"+width+"px; height:"+height+"px";
  div.style.cssText="left:"+left+"px; top:"+topp+"px;";
  div.children[1].style.cssText="width:"+width+"px; height:"+height+"px";
  nextPos(width,height)
}

function randomShuffle(){
  for(i=0;i<picNameArray.length;i++){
    tempstr=picNameArray[i]
    k=Math.round(Math.random()*(picNameArray.length-i-1))+i
    picNameArray[i]=picNameArray[k]
    picNameArray[k]=tempstr
  }
}

/*pop show*/
function pos(image_layer){
  imageElement=image_layer.parentElement.getElementsByTagName('img')[0]
	id=imageElement.id
  
  /*calculate position of elements*/
	var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop)
  originalWidth=imageElement.naturalWidth
  originalHeight=imageElement.naturalHeight
  windowWidth=window.innerWidth
  windowHeight=window.innerHeight
  newWidth=originalWidth
  newHeight=originalHeight
  ratio=0.7
  if(originalWidth/originalHeight>windowWidth/windowHeight){
    if(originalWidth>ratio*windowWidth){
      newWidth=ratio*windowWidth
      newHeight=originalHeight*newWidth/originalWidth
    }
  }else{
    if(originalHeight>ratio*windowHeight){
      newHeight=ratio*windowHeight
      newWidth=originalWidth*newHeight/originalHeight
    }
  }
  
	document.getElementById('mainPic').src='image\\'+picNameArray[id]
  document.getElementById('mainPic').style.width=newWidth+"px"
  document.getElementById('mainPic').style.height=newHeight+"px"
  
	document.getElementById('pop').style.top=(windowHeight-newHeight-20)/2+"px"
  document.getElementById('pop').style.left=(windowWidth-newWidth)/2+"px"
	document.getElementById('pop').style.display="block"
  
  document.getElementById('background_layer').style.zIndex=2;
	
	i=0;
  /*clear last counter if needed*/
  clearInterval(counter)
  
  /*interval for the fading away effect*/
  counter=setInterval(
    function(){
      i+=0.015
      document.getElementById('background_layer').style.cssText+='filter:alpha(opacity='+i*100+');-moz-opacity:'+i+';-khtml-opacity: '+i+';opacity: '+i+';'
      if(i>=1)
        clearInterval(counter)
    },30
  )
  
  document.getElementById('close').setAttribute('onclick','closeShow('+counter+')')
}

/*close the pop show*/
function closeShow(counterNumber){
	document.getElementById('pop').style.display="none"
	document.getElementById('background_layer').style.cssText+='filter:alpha(opacity=0); -moz-opacity:0; -khtml-opacity:0; opacity:0;z-index:-1;'
  clearInterval(counterNumber)
}
	
/*getting dark when mouseover*/
function showlayer(image_layer){
	image_layer.style.cssText+="filter:alpha(opacity=100); -moz-opacity:1; -khtml-opacity: 1; opacity: 1;"
	
}
	
/*recover when mouseout*/
function hidelayer(image_layer){
	image_layer.style.cssText+="filter:alpha(opacity=0); -moz-opacity:0; -khtml-opacity: 0; opacity: 0;"
}
	

  

/*initialize on loading*/
window.onload=function(){
  fillContainer()
  
  document.getElementById('image_container').style.width=(widthBigSquare+indence)*maxNumOfBigSquareInARow-indence+2*padding+"px"
  if(hasImageInRow)
    document.getElementById('image_container').style.height=(rowNumber+1)*(heightBigSquare+indence)-indence+2*padding+"px"
  else{
    document.getElementById('image_container').style.height=(rowNumber)*(heightBigSquare+indence)-indence+2*padding+"px"
  }
}
  
  