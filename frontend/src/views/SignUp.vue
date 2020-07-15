<template>
<v-container flex class="wrap-content">
  <v-row class="text-center">
    <v-col class cols="12">
      <a href="http://localhost:8080/" class="text_logo">SIGNUP</a>
    </v-col>
    <v-col>
      <v-text-field :rules="[rules.required]"
      v-model="user.name" label="이름" outlined></v-text-field>
      <v-text-field :rules="[rules.required, this.form.min_student_id]"
      v-model="user.student_id" label="학번" outlined></v-text-field>
      <v-text-field :rules="[rules.required]" v-model="user.organization"
      label="소속기관" outlined></v-text-field>
      <v-row>
        <v-col cols="9" class="py-0 pr-0">
          <v-text-field class="small-text" :rules="[rules.required]"
          v-model="user.email" label="이메일"
          suffix="@dgist.ac.kr" outlined></v-text-field>
        </v-col>
        <v-col cols="3" class="py-0">
          <v-btn class="email-btn" color="secondary white--text" height="40pt"
          text-lg-center outlined small v-on:click="log">전송하기</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9" class="py-0 pr-0">
          <v-text-field :rules="[rules.required]"
          label="인증번호" outlined></v-text-field>
        </v-col>
        <v-col cols="3" class="py-0">
          <v-btn class="email-btn" color="secondary white--text" height="40pt"
          text-lg-center outlined small v-on:click="log">인증하기</v-btn>
        </v-col>
      </v-row>
      <v-text-field :append-icon="show_pw ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, this.form.min_pw]" :type="show_pw ? 'text' : 'password'"
      v-model="user.password" label="비밀번호" hint="At least 8 characters"
      @click:append="show_pw = !show_pw" outlined></v-text-field>
      <v-text-field :append-icon="show_pw_check ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, this.form.pwMatch]"
      :type="show_pw_check ? 'text' : 'password'" v-model="user.password_check" label="비밀번호 확인"
        @click:append="show_pw_check = !show_pw_check" outlined></v-text-field>
      <v-btn color="secondary white--text" height="40pt"
      text-lg-center depressed x-large block v-on:click="signUp">가 입 하 기</v-btn>
      <v-btn v-on:click="log">ss</v-btn>
      <br />
    </v-col>
  </v-row>
  <div wrap-ul>
    <ul>
      <li>
        <p>계정이 있으신가요?</p>
      </li>
      <li>
        <a href="http://localhost:8080/">로그인</a>
      </li>
    </ul>
  </div>
</v-container>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        name: "",
        student_id: "",
        email: "",
        password: "",
        password_check: "",
        organization: "DGIST",
      },
      formHasErrors: 0,
      show_pw: true,
      show_pw_check: true,
      rules: {
        required: (value) => !!value || "Required.", // ||을 기준으로 왼쪽은 기준, 오른쪽은 씌여지는 문구
      },
    }
  },

  computed: {
    form() {
      return {
        //name_require: value => !!this.user.name || "Required.",
        min_pw: (v) => this.user.password.length >= 8 || "Min 8 characters",
        min_student_id: (v) =>
          this.user.student_id.length == 9 || "학번을 정확히 입력해주세요",
        pwMatch: (val) =>
          !!(this.user.password === this.user.password_check) ||
          "password you entered don't match",
      }
    },
  },

  methods: {
    log() {
      console.log("user is %s", req.user)
    },

    check_form() {
      if (this.formHasErrors) return

      var check_error = 0
      if (this.form.min_student_id() == "학번을 정확히 입력해주세요") {
        check_error = 1
        alert("학번을 정확히 입력해 주세요!")
      }
      if (this.form.min_pw() == "Min 8 characters") {
        check_error = 1
        alert("비밀번호는 8자리 이상이어야 합니다!")
      }
      if (this.form.pwMatch() == "password you entered don't match") {
        check_error = 1
        alert("비밀번호와 확인이 서로 맞지 않습니다!")
      }
      this.formHasErrors = check_error
    },

    check_inform_require() {
      var check_error = 0
      Object.values(this.user).forEach((content) => {
        if (!content) {
          check_error = 1
          console.log("d")
        }
      })

      if (check_error) alert("적지 않은 필수 항목이 존재합니다!")
      this.formHasErrors = check_error
      return
    },

    signUp: function(event) {
      this.check_inform_require()
      this.check_form()
      if (this.formHasErrors) {
        return
      }
      this.$http
        .post("/api/login/signUp", {
          //axios 사용
          user: this.user,
        })
        .then((response) => {
          if (response.data.result) {
            alert(response.data.message)
            this.$router.push("/") // Login 페이지로 보내줌
          } else {
            console.log(response.data)
            alert(response.data.message)
          }
        })
        .catch(function(error) {
          alert("error")
        })
    },
  },
}
</script>

<style scoped>
.wrap-content {
  margin-top: 100pt;
  width: 400pt;
}
.small-text {
  width: 100%;
}
a {
  text-decoration: none;
}
.text_logo {
  color: black;
  font-size: 37pt;
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
.v-btn {
  font-size: 1.05rem;
  font-weight: 350;
}
.email-btn {

  font-weight: 700;
}
</style>
