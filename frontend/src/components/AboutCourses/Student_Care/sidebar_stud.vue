<template>
  <div class="sidebar">
  <v-card class="mx-auto" max-width="210">
    <v-list>
      <v-list-item
      link
      v-on:click="change_middle_title(item)"
      >
        <v-list-item-title>학생별</v-list-item-title>
      </v-list-item>

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>수업 및 과제별</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>수업</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>과제</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(crud, i) in cruds"
            :key="i"
            @click=""
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>

      <v-list-item link>
        <v-list-item-title>통계</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-card>
</div>
</template>

<script>
  export default {
    props: ["sidebar_title"],
    data: () => ({
      middle_title: "",
      items: [{ title: "학생별" , component_name: "student"},
              { title: "수업 및 과제별" , component_name: "lec_ass"},
              { title: "통계" , component_name: "statistics"}
            ],
      admins: [
        ['수업1', 'people_outline'],
        ['수업2', 'settings'],
      ],
      cruds: [
        ['과제1', 'add'],
        ['과제2', 'insert_drive_file']
      ]
    }),
    methods: {
      changeComponent: function(item) {
        var selected_com ="");
      }
    },
    change_middle_title: function(title) {
      var selected_com = "";
      this.tap_data.forEach(function(value) {
        if (value.middle_title == title) {
          selected_com = value.component_name;
        }
      });

      this.selectedComponent = selected_com;
      this.selectedTitle = title;
    },
    created() {
      this.middle_title = this.sidebar_title;
    }
};
</script>

<style scoped>
.sidebar {
  padding-top: 3%;
  float: left;
  width: 20%;
  padding-left: 2%;
}
.side_title {
  font-size: 1.15rem;
  font-weight: 700;
}
.wrap-side-list {
  border-top: 2px solid #8d8d8d;
}
.side-list-title {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
