<template>
  <div>
    <v-card class="my-5 py-1" v-for="(item, num) in sendData" :key="num" v-model="item.active">
      <v-list :flat="settings.flat" class="pa-0">
        <v-list-group
          :value="settings.value"
          :ripple="settings.ripple"
          :disabled="listDisable"
          :color="assignCardSend.pick_color"
        >
          <template v-slot:activator>
            <v-list-item-content class="pl-5 py-6">
              <v-row align="center">
                <v-icon>fas fa-edit</v-icon>
                <v-col class="ml-5">
                  <v-text-field v-if="EditBool" v-model="item.title" class="title_font"></v-text-field>
                  <v-list-item-title v-else v-text="item.title" class="title_font"></v-list-item-title>
                </v-col>
                <v-spacer></v-spacer>
                <v-chip
                  v-if="user_isprof == 'stud'"
                  color="primary"
                  text-color="white"
                  class="chiptitle mr-10"
                  v-text="`${item.totalscore} / ${item.totalperfect}`"
                ></v-chip>
                <v-icon
                  class="mx-5"
                  v-if="EditBool"
                  v-on:click="delAssign('title', num)"
                >fas fa-trash-alt</v-icon>
              </v-row>
            </v-list-item-content>
          </template>

          <v-list-item class="pb-3" v-for="(subItem, i) in item.subitems" :key="i" @click>
            <v-list-item-content>
              <v-row align="center">
                <v-col cols="10" class>
                  <v-text-field
                    v-if="EditBool"
                    v-model="subItem.subtitle"
                    class="title_font pl-16 py-0"
                  ></v-text-field>
                  <v-list-subtitle v-else class="title_font pl-16 py-10" v-text="subItem.subtitle"></v-list-subtitle>
                </v-col>

                <v-list-subtitle
                  class="ml-7"
                  color="secondary"
                  v-if="user_isprof == 'stud'"
                  v-text="`${subItem.score} / ${subItem.perfect}`"
                ></v-list-subtitle>

                <v-icon v-if="EditBool" class="ml-7" v-on:click="addSubAssign(num, i)">fas fa-plus</v-icon>
                <v-icon
                  v-if="EditBool"
                  class="mx-3"
                  v-on:click="delAssign('subtitle', num, i)"
                >fas fa-trash-alt</v-icon>

                <!-- <v-col cols="1" class="brief-center"> </v-col>
                <v-col cols="1" class="brief-left">
                  <v-list-item-title
                    v-text="subItem.perfect"
                  ></v-list-item-title>
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
  props: ["sendData", "assignCardSend", "EditBool", "user_isprof"],
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
.chiptitle {
  height: 35px;
  font-size: 1.1rem;
}
</style>
