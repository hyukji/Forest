import tokenize
import suji
from crawling import getText, getOneText


users = getText('http://114.71.103.80/new_db.php?q=select+*+from+users+limit+100','1')
del users[0]
for user in users:
    problems = getText('http://114.71.103.80/new_db.php?q=select+*+from+code_submission+c%2C+%28select+id%2C+max%28regtime%29+a+from+code_submission+where+id+%3D'+user+'+group+by+p_no%29+d+where+c.id+%3D+d.id+and+d.a+%3D+c.regtime+',  '4')
    print(EquOpBl(problems), user)
