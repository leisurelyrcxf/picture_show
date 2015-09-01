import os
r = open('result', 'w')
str='['
for file in os.listdir('.'):
  if (file.split('.')[-1].lower()=="jpg" or file.split('.')[-1].lower()=="bmp") and file!="close.jpg":
    str+="\""+file+"\", "
r.write(str[:-2]+' ]')
r.close()