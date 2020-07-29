<template>
  <div>
    <v-card class="ma-5 py-1" v-for="(item, num) in sendData" :key="num" v-model="item.active">
      <v-list :flat="settings.flat">
        <v-list-group
          :value="settings.value"
          :ripple="settings.ripple"
          :disabled="listDisable"
          :color="assignCardSend.pick_color"
        >
          <template v-slot:activator>
            <v-list-item-content class="pl-5 py-4">
              <v-row align="center">
                <v-icon>fas fa-edit</v-icon>
                <v-col class="ml-5">
                  <v-text-field v-if="EditBool" v-model="item.title" class="title_font"></v-text-field>
                  <v-list-item-title v-else v-text="item.title" class="title_font"></v-list-item-title>
                </v-col>

                <v-col v-if="user_isprof == 'stud'" cols="2" class="score-chip">
                  <v-list-item-action>
                    <v-chip
                      color="primary"
                      text-color="white"
                      class="assignment-right"
                      v-text="`${Total} / ${PerfectTotal}`"
                    ></v-chip>
                  </v-list-item-action>
                </v-col>

                <v-icon
                  class="mx-5"
                  v-if="EditBool"
                  v-on:click="delLecture('title', num)"
                >fas fa-trash-alt</v-icon>
              </v-row>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(subItem,i) in item.subitems" :key="i" @click>
            <v-list-item-content>
              <v-row align="center">
                <v-text-field
                  v-if="EditBool"
                  v-model="subItem.subtitle"
                  class="title_font pl-16 py-2"
                ></v-text-field>
                <v-list-item-title v-else class="title_font pl-16 py-2" v-text="subItem.subtitle"></v-list-item-title>

                <v-list-item-title
                  v-if="user_isprof == 'stud'"
                  v-text="`${subItem.score} / ${subItem.perfect}`"
                  class="text-center"
                ></v-list-item-title>

                <v-icon v-if="EditBool" class="mx-3" v-on:click="addSubLecture(num, i)">fas fa-plus</v-icon>
                <v-icon
                  v-if="EditBool"
                  class="mr-10"
                  v-on:click="delLecture('subtitle', num, i)"
                >fas fa-trash-alt</v-icon>

                <!-- <v-col cols="1" class="brief-center">
                /
              </v-col>
              <v-col cols="1"  class="brief-left">
                <v-list-item-title v-text="subItem.perfect"></v-list-item-title>
                </v-col>-->
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
  props: ["sendData", "assignCardSend", "EditBool"],
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
    delAssign(type, numAssign, numSubAssign) {
      if (type == "title") {
        this.sendData.splice(numAssign, 1);
      } else {
        this.sendData[numAssign].subitems.splice(numSubAssign, 1);
      }
    },
    addSubAssign(numAssign, numSubAssign) {
      this.sendData[numAssign].subitems.splice(numSubAssign + 1, 0, {
        subtitle: "새 항목",
      });

      //this.sendData.subitems.splice(content);
    },
  },
  created() {},
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
