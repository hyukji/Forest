export const authentication = {
  data: function() {
    return {
      user_data: {
        email: "",
        name: "",
        position: "",
      },
    }
  },
  methods: {
    check_isauth(bool) {
      this.$http
        .get("/api/home/authentication")
        .then((res) => {
          var isauth = res.data.isauth
          if (bool) {
            if (isauth) {
              this.user_data.email = res.data.email
              this.user_data.name = res.data.name
              this.user_data.position = res.data.position
            } else {
              this.$router.push("/") // signin 페이지로 보내줌
            }
          } else {
            if (isauth) {
              this.$router.push("/mycourse")
            }
          }
        })
        .catch(function(error) {
          //console.log("에러")
          alert("인증 권한 error")
        })
    },
  },
}

//사용될 component에 date라는 변수가 있어야 하며
//import {dateFormat} from "../mixins/dateFormat" 을 하고
//methods처럼 mixins: [dateFormat] 을 넣어주면 된다.
//사용할때에는 그냥 {{getDateAndTime(데이터)}} 그냥 거기 안에서 불린단어처럼 사용 사용.

//methods처럼 data 넣어서 그냥 사용사능.
