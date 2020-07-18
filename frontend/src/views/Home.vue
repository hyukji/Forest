<template>
  <div class="wrap-content">
    <v-row class="row_div">
      <div class="left_div">
        <v-img :src="require('../assets/main.png')" class="image1" contain height="300" />
      </div>

      <div class="right_div">
        <v-card class="sign_in" outlined>
          <v-card-text>
            <v-text-field v-model="user.email" label="아이디"></v-text-field>
            <v-text-field v-model="user.password" :type="'password'" label="비밀번호"></v-text-field>
            <v-btn
              color="primary white--text"
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
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    isaut() {
      console.log("11111");
      return this.$store.state.isauth;
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
  }
};
</script>

<style scoped>
.wrap-content {
  padding-right: 10%;
  padding-left: 10%;
  padding-top: 10%;
  padding-bottom: 20%;
  margin-right: 0;
  min-width: 800px; /* Suppose you want minimum width of 1000px */
  background-color: rgb(120, 120, 120);
}
.row_div {
}
.image1 {
}
.left_div {
  width: 50%;
}
.right_div {
  width: 50%;
  padding-left: 10%;
  padding-right: 10%;
}
.right-right-div {
  width: 100pt;
  max-width: 200pt;
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
</style>
