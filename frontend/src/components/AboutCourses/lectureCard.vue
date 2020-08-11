<template>
  <div>
    <v-card class="mb-5" v-for="(item, num) in sendData" :key="num">
      <v-list :flat="settings.flat" class="py-0">
        <v-list-group
          :value="settings.value"
          :ripple="settings.ripple"
          :disabled="listDisable"
          :color="lectureCardSend.pick_color"
        >
          <template v-slot:activator>
            <v-list-item-content class="pl-5 py-6" justify="center" align="start">
              <v-row align="center">
                <v-icon>fas fa-book</v-icon>
                <v-col class="ml-5" cols="3">
                  <v-text-field v-if="EditBool" v-model="item.title" class="title_font"></v-text-field>
                  <v-list-item-title v-else v-text="item.title" class="title_font"></v-list-item-title>
                </v-col>

                <v-col
                  cols="7"
                  v-if="user_isprof == 'stud'"
                  class="bar mx-13 pa-0"
                  justify="center"
                >
                  <v-progress-linear
                    v-model="skill"
                    color="light-green lighten-3"
                    height="13"
                    rounded
                  >
                    <template v-slot="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </v-progress-linear>
                </v-col>
                <v-spacer></v-spacer>
                <v-icon
                  class="mx-5"
                  v-if="EditBool"
                  v-on:click="delLecture('title', num)"
                >fas fa-trash-alt</v-icon>
              </v-row>
            </v-list-item-content>
          </template>

          <v-list-item
            class="pb-3"
            v-for="(subItem, i) in item.subitems"
            :key="i"
            @click="open_editor(subItem._id)"
          >
            <v-list-item-content>
              <v-row align="center">
                <v-col cols="10" class="py-0">
                  <v-text-field
                    v-if="EditBool"
                    v-model="subItem.subtitle"
                    class="title_font pl-16 py-2"
                  ></v-text-field>
                  <v-list-item-title v-else v-text="subItem.subtitle" class="title_font pl-16 py-2"></v-list-item-title>
                </v-col>
                <v-icon v-if="EditBool" class="ml-7" v-on:click="addSubLecture(num, i)">fas fa-plus</v-icon>
                <v-icon
                  v-if="EditBool"
                  class="mx-3"
                  v-on:click="delLecture('subtitle', num, i)"
                >fas fa-trash-alt</v-icon>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  model: {
    prop: "sendData",
  },
  props: ["sendData", "lectureCardSend", "EditBool", "user_isprof"],
  data: function () {
    return {
      listDisable: false,
      settings: {
        value: null,
        flat: true,
        ripple: true,
      },
    };
  },
  computed: {},
  watch: {
    EditBool() {
      this.settings.flat = "false";
      this.settings.ripple = false;

      this.listDisable = this.EditBool ? true : false;

      this.settings.value = this.EditBool ? true : null;
    },
  },
  methods: {
    open_editor(itme_id) {
      var newWindow = window.open("/newedit/" + this.$route.params.course_code);
      newWindow.my_special_setting = itme_id;
    },
    delLecture(type, numLecture, numSubLecture) {
      if (type == "title") {
        this.sendData.splice(numLecture, 1);
      } else {
        this.sendData[numLecture].subitems.splice(numSubLecture, 1);
      }
    },
    addSubLecture(numLecture, numSubLecture) {
      this.sendData[numLecture].subitems.splice(numSubLecture + 1, 0, {
        subtitle: "새 항목",
      });

      //this.sendData.subitems.splice(content);
    },
  },
  created() {
    console.log("senddata is ", this.sendData);
  },
};
</script>

<style scoped>
.title_font {
  font-size: 1.2rem;
  font-weight: 600;
}

.bar {
  padding-bottom: 0;
  padding-top: 18px;
}

.content {
  border: 1px solid black;
  width: 800px;
}

.wrap-dashboard {
  padding-top: 1%;
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 2%;
}
.right {
  float: right;
}

.dashboard-cards-half {
  display: inline-block;
  width: 50%;
  padding-left: 2%;
  padding-right: 2%;
}
.dashboard-cards {
  display: block;
  width: 100%;
}
.wrap-card {
  padding-bottom: 3%;
}
.card_title {
  color: #2c2e37;

  padding-top: 2.3%;
  padding-left: 3%;
  font-size: 1.25rem;
  font-weight: 550;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  font-size: 1.2rem;
  color: #2c2e37;
  padding: 1%;
  margin: 0;
}
</style>
