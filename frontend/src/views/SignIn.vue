<template>
  <v-container fluid background-color="teal lighten-5" class="wrap-content">
    <v-row class="text-center">
      <v-col class cols="12">
        <router-link to="/">
          <v-img :src="require('../assets/forest_logo_green.png')" class="image1" contain height="150" />
        </router-link>
        <p class="text_header">로그인</p>
      </v-col>
      <v-col>
        <v-text-field v-model="user.email" label="아이디"></v-text-field>
        <v-text-field
          v-model="user.password"
          input type='password'
          label="비밀번호"
          v-on:keyup.enter="signIn"
        ></v-text-field>
        <v-btn
          color="teal white--text"
          height="40pt"
          text-lg-center
          depressed
          large
          block
          v-on:click="signIn"
          >로그인</v-btn>
        <br />
        <ul>
          <li>
            <a>아이디 찾기</a>
          </li>
          <li>
            <a>비밀번호 찾기</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        email: "",
        password: "",
      },
    }
  },
  methods: {
    signIn: function(event) {
      this.$http
        .post("/api/login/signIn", {
          //axios 사용
          email: this.user.email,
          password: this.user.password
        })
        .then(res => {
          if (res.data.result == 0) {
            alert(res.data.message);
          }
          if (res.data.result == 1) {
            alert(res.data.message);
            this.$router.push("/mycourse"); // Login 페이지로 보내줌
          }
        })
        .catch(function(error) {
          alert("error");
        });
    }
  },
}
</script>

<style scoped>
.wrap-content {
  width: 400pt;
}
ul {
  text-align: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  display: inline-block;
  margin-right: 3%;
}
a {
  text-decoration: none;
}
.text_logo {
  color: black;
  font-size: 37pt;
}
.text_header{
  padding-top: 2%;
  color: #66BB6A;
  font-size: 2em;
}
</style>
