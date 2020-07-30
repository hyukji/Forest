<template>
  <v-card>
    <v-card-title class="pt-14 pl-12">
      <span class="headline">{{this.sendData.typeofdata}} Form</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form>
          <v-row justify="center">
            <v-col cols="11">
              <v-text-field v-model="newObj.title" label="Title" required></v-text-field>
            </v-col>
            <v-col cols="11">
              <div v-for="(subitem, i) in newObj.subitems" :key="i">
                <v-text-field
                  v-model="subitem.subtitle"
                  label="SubTitle"
                  required
                  append-icon="fas fa-plus "
                  append-outer-icon="fas fa-trash-alt"
                  @click:append="addSubtitle(i)"
                  @click:append-outer="delSubtitle(i)"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-form>
        <!-- -->
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="FormClose" large>cancle</v-btn>
      <v-btn
        v-if="sendData.typeofdata == 'Lecture'"
        color="primary"
        text
        v-on:click="makeLecture"
        large
      >Save</v-btn>
      <v-btn v-else color="primary" text v-on:click="makeAssign" large>Save</v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: "sendData",
  },
  props: ["sendData"],
  data: function () {
    return {
      newObj: {
        title: "",
        subitems: [{ subtitle: "01. 새 항목" }, { subtitle: "02. 새 항목" }],
      },
    };
  },
  methods: {
    delSubtitle(index) {
      this.newObj.subitems.splice(index, 1);
    },
    addSubtitle(index) {
      var zero = index < 8 ? "0" : "";
      this.newObj.subitems.splice(index + 1, 0, {
        subtitle: zero + (index + 2) + ". 새 항목",
      });
    },
    FormClose() {
      console.log(this.sendData.typeofdata);
      this.newObj = {
        title: "",
        subitems: [{ subtitle: "01. 새 항목" }, { subtitle: "02. 새 항목" }],
      };
      this.sendData.dialog = false;
    },

    makeAssign() {
      this.$store.commit("addAssignData", this.newObj);
      this.$http
        .post("/api/mycourse/" + this.$route.params.course_code + "/assign", {
          newAssign: this.newObj,
        })
        .then((res) => {
          //  alert(res.data.message);
        })
        .catch(function (error) {
          alert("error");
        });
      this.sendData.dialog = false;
    },

    makeLecture() {
      this.$store.commit("addLectureData", this.newObj);
      this.$http
        .post("/api/mycourse/" + this.$route.params.course_code + "/lecture", {
          newLecture: this.newObj,
        })
        .then((res) => {
          //  alert(res.data.message);
        })
        .catch(function (error) {
          alert("error");
        });
      this.sendData.dialog = false;
    },
  },
  created() {},
};
</script>
