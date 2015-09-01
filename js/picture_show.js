/* JavaScript Document*/

/*list of block size combination*/
sizeList=[[160,Math.floor(160*100/160)], [200,Math.floor(200*100/160)], [320,200]]

/*size of small square*/
var widthSmallSquare
var heightSmallSquare

/*size of big square*/
var widthBigSquare
var heightBigSquare

/*max number of big square in a row*/
var maxNumOfBigSquareInARow

/*size of indence*/
var indence = 10

/*size of padding*/
var padding = 15

/*ratio to decide image shape*/
/*maximal height/width ratio, bigger than this will turn into rectangular instead of square*/
var maxHeightWidthRatioForNormalSize
/*maximal width/height ratio, bigger than this will turn into rectangular instead of square*/
var maxWidthHeightRatioForNormalSize

/*global variable for the counter ID*/
var counter

/*left position of each div of image*/
var left=padding

/*use to determin the height of the container div*/
var hasImageInRow=false

/*top position of each div of image*/
var topp=padding

/*relative top*/
var topRelative

/*max left offset in a row*/
var maxOfLeft

/*count total row number*/
var rowNumber

/*width of last image*/
var lastWidth

/*index of current processing image*/
var currentIdx=0

/*number of row loaded per time*/
var loadRowNumPerTime

var loadNumPerTime

/*scroll flag used to reduce scroll event execution times*/
var scrollFlag=true


/*file name array*/
var picNameArray = ["0 (2).jpg", "1 (2).jpg", "10 (2).jpg", "10.jpg", "11 (2).jpg", "11.jpg", "12 (2).jpg", "12.jpg", "13 (2).jpg", "13.jpg", "14 (2).jpg", "14.jpg", "15 (2).jpg", "15.jpg", "16 (2).jpg", "16.jpg", "17 (2).jpg", "18 (2).jpg", "18.jpg", "19 (2).jpg", "19.jpg", "2 (2).jpg", "2.jpg", "20 (2).jpg", "20.jpg", "21 (2).jpg", "22 (2).jpg", "24 (2).jpg", "26 (2).jpg", "27 (2).jpg", "3 (2).jpg", "4 (2).jpg", "43 (2).jpg", "46 (2).jpg", "47.jpg", "48.jpg", "49.jpg", "5.jpg", "7 (2).jpg", "8 (2).jpg", "8.jpg", "9 (2).jpg", "9.jpg", "IMG_3089.JPG", "IMG_3102.JPG", "IMG_3139.JPG", "IMG_3166.JPG", "IMG_3222.JPG", "IMG_3238.JPG", "IMG_3244.JPG", "IMG_3245.JPG", "IMG_3262.JPG", "IMG_3269.JPG", "IMG_3270.JPG", "IMG_3275.JPG", "IMG_3310.JPG", "IMG_3315.JPG", "IMG_3318.JPG", "IMG_3322.JPG", "IMG_3329.JPG", "IMG_3335.JPG", "IMG_3341.JPG", "IMG_3342.JPG", "IMG_3343.JPG", "IMG_3344.JPG", "IMG_3345.JPG", "IMG_3346.JPG", "IMG_3379.JPG", "IMG_3382.JPG", "IMG_3383.JPG", "IMG_3384.JPG", "IMG_3473.JPG", "IMG_3479.JPG", "IMG_3482.JPG", "IMG_3483.JPG", "IMG_3499.JPG", "IMG_3527.JPG", "IMG_3532.JPG", "IMG_3559.JPG", "IMG_3582.JPG", "IMG_3635.JPG", "IMG_3636.JPG", "IMG_3646.JPG" ]

var n=picNameArray.length


/*global array of divs of images*/
var divArray=[]

/*initiazie div array*/
initialize()

function getScrollTop(){
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if(document.body){
    bodyScrollTop = document.body.scrollTop;
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop;
  }
　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
//文档的总高度
function getScrollHeight(){
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if(document.body){
    bodyScrollHeight = document.body.scrollHeight;
　}
  if(document.documentElement){
　　documentScrollHeight = document.documentElement.scrollHeight;
　}
　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
  var windowHeight = 0;
  if(document.compatMode == "CSS1Compat"){
  windowHeight = document.documentElement.clientHeight;
  }else{
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

/*fill divs in container*/
function fillContainer(){
  for(;currentIdx<divArray.length;currentIdx++){
    if(divArray.length==n){
      /*if reach end of file list then we must skip to next position when no more proper image of appropriate size for current position*/
      resize(currentIdx,true)
      document.getElementById('image_container').appendChild(divArray[currentIdx])
    }else{
      /*otherwise we just stop at the bad position and wait for more images filled in the buffer so we can start search again next time*/
      var returnFlag=resize(currentIdx,false)
      if(!returnFlag) //if reach position without any proper image to fill in{
        alert(1)
        break
      }
      document.getElementById('image_container').appendChild(divArray[currentIdx])
    }
  }
  
  if(hasImageInRow)
    document.getElementById('image_container').style.height=(rowNumber+1)*(heightBigSquare+indence)-indence+2*padding+"px"
  else{
    document.getElementById('image_container').style.height=(rowNumber)*(heightBigSquare+indence)-indence+2*padding+"px"
  }
}

/*initialize*/
function initialize(){
  randomShuffle()
  idx=Math.round(Math.random()*(sizeList.length-1))
  /*size of small square*/
  widthSmallSquare = sizeList[idx][0]
  heightSmallSquare = sizeList[idx][1]
  
  /*adjust for mobile device*/
  if(window.screen.width<window.screen.height){
    widthSmallSquare = Math.floor((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth-2*padding-3*indence-20)/2)
    heightSmallSquare = Math.round(widthSmallSquare/160*100)
  }
  widthBigSquare = 2*widthSmallSquare+indence
  heightBigSquare = 2*heightSmallSquare+indence
  maxHeightWidthRatioForNormalSize = heightBigSquare/widthBigSquare*1.5
  maxWidthHeightRatioForNormalSize = widthBigSquare/heightBigSquare*1.5
  maxNumOfBigSquareInARow = Math.floor(window.screen.width/widthBigSquare)
  maxOfLeft=(widthBigSquare+indence)*(maxNumOfBigSquareInARow-1)+padding+widthSmallSquare+indence
  loadRowNumPerTime=window.screen.height/heightBigSquare+1
  loadNumPerTime=Math.floor(loadRowNumPerTime*maxNumOfBigSquareInARow)

  
  var scrollFunc = function(){ 
    if(scrollFlag){ 
      scrollFlag=false
      loadImages(loadNumPerTime, true)
      setTimeout(function(){
        scrollFlag=true
        },500
      )
    }
  }
  
  window.onscroll = scrollFunc

  
  
  var wheelFunc = function (e) {  
    e = e || window.event;  
    if(e.wheelDelta){  //判断浏览器IE，谷歌滑轮事件               
      if(e.wheelDelta>=0){ //当滑轮向上滚动时  
          return 
      }
    }else if(e.detail){  //Firefox滑轮事件  
      if (e.detail>= 0){ //当滑轮向上滚动时  
        return
      }
    }
    if(getScrollTop() + getWindowHeight() == getScrollHeight()){  //scroll在页面底部
      scrollFunc()
    }
  }
  
  if (document.addEventListener) {//firefox  
    document.addEventListener('DOMMouseScroll', wheelFunc, false);  
  }  
  //滚动滑轮触发scrollFunc方法  //ie 谷歌  
  window.onmousewheel = document.onmousewheel = wheelFunc;  
  
  
  topRelative=0
  rowNumber=0
  lastWidth=0
  loadImages(Math.floor(loadNumPerTime*1.5), false)
}

function loadImages(loadNumber, boolAddListener){
  loadedImageNumber=divArray.length
  for(i=loadedImageNumber; i<Math.min(loadNumber+loadedImageNumber,n)-1; i++){
    var img=document.createElement('img')
    img.id=i+""
    img.src='image\\'+picNameArray[i]

    var image_layer=document.createElement('div')
    image_layer.setAttribute('class',"image_layer")
    image_layer.setAttribute('onmouseover','showlayer(this)')
    image_layer.setAttribute('onmouseout','hidelayer(this)')
    

    var div=document.createElement('div')
    div.setAttribute('class','image')

    
    div.appendChild(img)
    div.appendChild(image_layer)
    
    divArray.push(div)
  }
  
  var img=document.createElement('img')
  img.id=i+""
  img.src='image\\'+picNameArray[i]
  
  /*fill imageContainer when last image finish loaded*/
  if(boolAddListener){
    img.onload=function(){
      setTimeout(fillContainer,100)
    }
  }

  var image_layer=document.createElement('div')
  image_layer.setAttribute('class',"image_layer")
  image_layer.setAttribute('onmouseover','showlayer(this)')
  image_layer.setAttribute('onmouseout','hidelayer(this)')

  var div=document.createElement('div')
  div.setAttribute('class','image')

  
  div.appendChild(img)
  div.appendChild(image_layer)
  
  divArray.push(div)
}
/*get the position of next image*/
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
  if(left>maxOfLeft+widthSmallSquare){
    left=padding
    topp+=heightBigSquare+indence
    rowNumber++
    hasImageInRow=false
  }
  lastWidth=width
  lastHeight=height
}

function onclickMainPicture(id, evt){
  var mx = evt.clientX;//鼠标当前位置
  if (mx <= window.innerWidth/2){
    if(id>=1){
      pos(divArray[id-1].children[0], false)
    }else{
      alert("回到原点啦!")
    }
  }else{
    if(id<divArray.length-1){
      pos(divArray[id+1].children[0], false)
    }else{
      if(divArray.length<n){
        loadImages(loadNumPerTime, true)
        pos(divArray[id+1].children[0], false)
      }else{
        alert("到头了!")
      }
    }
  }
    
}

/*resize image height and width*/
function resize(i, moveNextWhenNoMoreProperImageFlag){
  if(topRelative==0){
    return resizeFromTop(i, moveNextWhenNoMoreProperImageFlag)
  }else{
    return resizeFromMiddle(i, moveNextWhenNoMoreProperImageFlag)
  }
}

/*resize when image is at middle*/
function resizeFromMiddle(i, moveNextWhenNoMoreProperImageFlag){
  var width
  var height
  if(lastWidth==widthBigSquare){   //上一个是水平长条
    k=i-1
    /*find first available element*/
    do{
      k++
      img=divArray[k].children[0]
      imgWidth=img.naturalWidth
      imgHeight=img.naturalHeight
    }while(imgHeight/imgWidth>maxHeightWidthRatioForNormalSize && k<divArray.length-1)
      
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
      if(moveNextWhenNoMoreProperImageFlag){
        nextPos(widthBigSquare,heightSmallSquare)
        return resizeFromTop(i, moveNextWhenNoMoreProperImageFlag)
      }else{
        return false
      }
    }
  }else{  //上一个是小方块
    k=i-1
    do{
      k++
      img=divArray[k].children[0]
      imgWidth=img.naturalWidth
      imgHeight=img.naturalHeight
    }while((imgHeight/imgWidth>maxHeightWidthRatioForNormalSize || imgWidth/imgHeight>maxWidthHeightRatioForNormalSize) && k<divArray.length-1)
      
    if(imgHeight/imgWidth<=maxHeightWidthRatioForNormalSize && imgWidth/imgHeight<=maxWidthHeightRatioForNormalSize){
      var div=divArray[k]
      divArray[k]=divArray[i]
      divArray[i]=div
      
      width=widthSmallSquare
      height=heightSmallSquare
    }else{
      if(moveNextWhenNoMoreProperImageFlag){
        nextPos(widthSmallSquare,heightSmallSquare)
        return resizeFromTop(i, moveNextWhenNoMoreProperImageFlag)
      }else{
        return false
      }
        
    }
  }
  
  div.children[0].style.cssText="width:"+width+"px; height:"+height+"px"
  div.children[0].id=i+""
  div.style.cssText="left:"+left+"px; top:"+topp+"px;"
  div.children[1].onclick=function(event){
    pos(div.children[0], true)
  }
  div.children[1].style.cssText="width:"+width+"px; height:"+height+"px"
  nextPos(width,height)
  return true
}

/*resize when image is at top*/
function resizeFromTop(i){
  var width
  var height
  if(left<maxOfLeft-widthSmallSquare){
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
    }while(imgWidth/imgHeight>maxWidthHeightRatioForNormalSize && k<divArray.length-1)
      
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
      if(moveNextWhenNoMoreProperImageFlag){
        nextPos(widthSmallSquare,heightBigSquare)
        return resizeFromTop(i, moveNextWhenNoMoreProperImageFlag)
      }else{
        return false
      }
      
    }
  }
  div.children[0].style.cssText="width:"+width+"px; height:"+height+"px";
  div.children[0].id=i+""
  div.style.cssText="left:"+left+"px; top:"+topp+"px;";
  div.children[1].onclick=function(event){
    pos(div.children[0], true)
  }
  div.children[1].style.cssText="width:"+width+"px; height:"+height+"px";
  nextPos(width,height)
  return true
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
function pos(imageElement, fadeAwayFlag){
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
  
  document.getElementById('mainPic').src=imageElement.src
  document.getElementById('mainPic').style.width=newWidth+"px"
  document.getElementById('mainPic').style.height=newHeight+"px"
  document.getElementById('mainPic').onclick=function(event){
    onclickMainPicture(parseInt(imageElement.id), event)
  }
  
  document.getElementById('pop').style.top=(windowHeight-newHeight-20)/2+"px"
  document.getElementById('pop').style.left=(windowWidth-newWidth)/2+"px"
  document.getElementById('pop').style.display="block"
  
  document.getElementById('background_layer').style.zIndex=2;
  document.getElementById('close').setAttribute('onclick','closeShow('+counter+')')
  
  
  if(fadeAwayFlag){
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
  }
  
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
  document.getElementById('image_container').style.width=(widthBigSquare+indence)*maxNumOfBigSquareInARow-indence+2*padding+"px"
  document.getElementById('image_container').style.height=4*(heightBigSquare+indence)-indence+2*padding+"px"
  
  
  fillContainer()
  
}
  
  