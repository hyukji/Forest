<template>
  <v-card>
    <v-card-title>
      <span class="headline mt-3">Course Form</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-col cols="12">
          <v-text-field label="과목 명" v-model="dialog_info.name" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="과목 코드" v-model="dialog_info.code" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-autocomplete
            :items="['python', 'C++']"
            label="사용 언어"
            v-model="dialog_info.language"
            required
          ></v-autocomplete>
        </v-col>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text v-on:click="makeCourse">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialog_info: { name: "", code: "", language: "" }
  }),
  methods: {
    makeCourse() {
      this.$http
        .post("/api/course/newcourse", {
          //axios 사용
          dialog_info: this.dialog_info
        })
        .then(res => {
          alert(res.data.message);
          if (res.data.result) this.$router.push("/mycourse/" + res.data.code);
        })
        .catch(function(error) {
          alert("error");
        });
    }
  }
};
</script>