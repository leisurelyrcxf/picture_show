/* JavaScript Document*/

/*size of big square*/
var sizeBigSquare = 380

/*size of small square*/
var sizeSmallSquare = 190

/*size of indence*/
var indence = 10

/*size of padding*/
var padding = 15

/*difference combination of square size*/
var total_array=[ 
                  [sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence],
                  [sizeSmallSquare,sizeSmallSquare,sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence,sizeBigSquare+indence],
                  [sizeBigSquare+indence,sizeBigSquare+indence,sizeBigSquare+indence],
                  [sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence,sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare],
                  [sizeBigSquare+indence,sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare,sizeSmallSquare,sizeSmallSquare],
                  [sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare,sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence], 
                  [sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare,sizeBigSquare+indence,sizeSmallSquare,sizeSmallSquare],
                  [sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare, sizeSmallSquare]
                ]
/*global array of divs of images*/
var div_array=[]

/*file name array*/
var pic=["dongqianhu.jpg", "dongqianhu2.jpg", "yuhang.jpg", "quanjing.jpg", "beilunyangshashan.jpg", "nantanglaojie.jpg", "heyidadao.jpg", "waitandaqiao.jpg", "tianyige.jpg", "ningbodayangba.jpg", "ningbodeshan.jpg", "ningbojiaowai.jpg", "jiuzhaopian.jpg", "xikou.jpg", "shengyuan.jpg", "meishuguan.jpg", "laowaitan.jpg", "gulou.jpg"] 

/*text of explanation to the corresponding photo*/
var text=["东钱湖", "东钱湖", "余杭", "全景", "北仑洋沙山", "南塘老街", "和义大道", "外滩大桥", "天一阁", "宁波大氧吧", "宁波的山", "宁波郊外", "旧照片", "溪口", "盛园", "美术馆", "老外滩", "鼓楼"]

/*global variable for the counter ID*/
var counter

/*left position of each div of image*/
var left=padding

/*top position of each div of image*/
var topp=padding

/*count total row number*/
var rowNumber=0
for(i=0;i<pic.length;){
	index=Math.round(Math.random()*(total_array.length-1))
  
  /*array of sizes for the row*/
	row_array=total_array[index]  
  
  /*row array length*/
	lenRow=row_array.length
  
  /*variable used to help calculate the position*/
  total=0
	for(k=0;k<=lenRow-1;k++){
    /*calculate picture position*/
		if(total%sizeBigSquare==0&&total!=0){
			left+=row_array[k-1]+indence
			if(row_array[k-1]==sizeSmallSquare)
        topp-=sizeSmallSquare+indence
		}
		if(total%sizeBigSquare!=0)
      topp+=sizeSmallSquare+indence
    
    total+=row_array[k];
    if(row_array[k]==sizeBigSquare+indence)
        total-=indence
		
		if((i+k)<pic.length){
      var div=document.createElement('div')
      div.setAttribute('class','image')
      div.style.cssText="width:"+row_array[k]+"px; height:"+row_array[k]+"px; left:"+left+"px; top:"+topp+"px;";
		
		
			var img=document.createElement('img')
			img.id=i+k+""
			img.style.cssText="width:"+row_array[k]+"px; height:"+row_array[k]+"px";
			img.src='image\\'+pic[i+k]
			
			var image_layer=document.createElement('div')
			image_layer.setAttribute('class',"image_layer")
			image_layer.style.width=row_array[k]+"px"
			image_layer.style.height=row_array[k]+"px"
			image_layer.setAttribute('onmouseover','showlayer(this)')
			image_layer.setAttribute('onmouseout','hidelayer(this)')
			image_layer.setAttribute('onclick','pos(this)')
			
			div.appendChild(img)
			div.appendChild(image_layer)
		}
    
		div_array.push(div)
	}
  
  /*calculate the new value of topp*/
  if(row_array[k-1]==sizeSmallSquare)
    topp+=sizeSmallSquare+indence
  else 
    topp+=sizeBigSquare+2*indence
	i+=lenRow
	left=padding
	rowNumber++
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
  
	document.getElementById('mainPic').src='image\\'+pic[id]
  document.getElementById('mainPic').style.width=newWidth+"px"
  document.getElementById('mainPic').style.height=newHeight+"px"
  
	document.getElementById('pop').style.top=(windowHeight-newHeight-40)/2-80+"px"
  document.getElementById('pop').style.left=(windowWidth-newWidth)/2+"px"
	document.getElementById('pop').style.display="block"
	document.getElementById('pop').getElementsByTagName('h1')[0].innerHTML=text[id]
	document.getElementById('pop').getElementsByTagName('div')[0].innerHTML=text[id]
  
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
  for(n=0;n<div_array.length;n++)
    document.getElementById('image_container').appendChild(div_array[n])
  
  document.getElementById('image_container').style.width=sizeBigSquare*3+5*indence+2*padding+"px"
  document.getElementById('image_container').style.height=rowNumber*(sizeBigSquare+2*indence)-indence+2*padding+"px"
}
  
  