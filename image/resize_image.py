import os

for file in os.listdir('.'):
  import Image
  if(file.split('.')[-1].lower()=="jpg" or file.split('.')[-1].lower()=="bmp"):
    img=Image.open(file,'r')
    img=img.resize((1000, img.size[1]*1000/img.size[0]))
    img.save("temp/"+file)
    print "finish processing"+file