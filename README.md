


# Forest

This repository divided two parts. Web page for IDE and Code plagiarism detector algorithm.

  


## Intruduction
해당 웹사이트 forest는 WEB IDE를 통해 원활한 교육환경을 제공하기 위해 만들어졌다. 따라서 유저별로과 수업관리, 성적관리 등이 가능하며 IDE화면에서는 코드 작성 및 실행이 가능하다.

aws에서 EC2 서비스를 구매해 Ubuntu 20.04 LTS에서 구동되며 DataBase는 NoSQL인 mongoDB를 사용했다. 학생들의 독립적인 코드 실행을 위해 코드를 실행할 때마다 docker python container를 생성했고 실행이 종료되면 container가 삭제된다. docker를 이용함으로써 resource 제한하고 서버의 보안성을 높일 수 있다. backend 개발은 nodejs와 express를 사용했다. 또한 실시간으로 코드 실행과 채점을 하기 때문에, 화면을 component로 나누어 효율적으로 관리할 수 있는 Vuejs를 frontend의 프레임워크로 사용하였다


## Tech stack
  

<div align="center">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"><img src="https://img.shields.io/badge/vuetify-4FC08D?style=for-the-badge&logo=vuetify&logoColor=white"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"><img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
</div>


## screenshot

- IDE screen

<img width="947" alt="splited" src="https://user-images.githubusercontent.com/52347271/230982502-601c7b15-42a8-4155-8074-e8be1f696aa5.png">

![run](https://user-images.githubusercontent.com/52347271/230982511-6f7663ba-234a-4570-bc8e-0cea3ecfaf0f.jpg)

- Login screen

![login](https://user-images.githubusercontent.com/52347271/230982509-260c2a49-a450-4377-bb0d-3f82488ea597.jpg)

- User screen

<img width="946" alt="user" src="https://user-images.githubusercontent.com/52347271/230982507-a879b06e-101e-4477-838d-3d7e1a9f0575.png">

![class2](https://user-images.githubusercontent.com/52347271/230982499-281958ab-05e3-4404-801c-b0c7d93dcc5c.png)

<img width="946" alt="class1" src="https://user-images.githubusercontent.com/52347271/230982505-189fabb7-2263-4c56-a75e-6e296d4aa2ac.png">


