<template>
  <div>
    <v-card max-width="1200" class="ma-10">
      <v-list v-if="items[0]">
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          prepend-icon="fas fa-book"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content class="pt-2">
              <v-row>
                <v-col cols="2">
                  <v-list-item-title v-text="item.title" class="title_font" s></v-list-item-title>
                </v-col>
                <v-col class="bar">
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
              </v-row>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.subitems" :key="subItem.subtitle" @click>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.subtitle"></v-list-item-title>
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
  name: "Dashboard",
  props: ["isprof"],
  data: function () {
    return {
      user_isprof: this.isprof,
      items: [null],

      show: false,
      middle_title: "대시보드",
    };
  },

  methods: {},
  created() {
    var course_code = this.$route.params.course_code;
    this.items = this.$store.state.lecture;
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
