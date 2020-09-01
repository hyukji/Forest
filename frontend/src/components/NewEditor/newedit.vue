<template>
  <div class="wrap">
    <EditToolbar />

    <v-row no-gutters class="wrap">
      <SideTab :drawer="drawer" />

      <splitpanes vertical class="wrap_splitpanes">
        <pane v-if="drawer.open" size="20" min-size="15" max-size="50">
          <side-content :selected="drawer.selected" />
        </pane>
        <pane>
          <splitpanes>
            <pane v-for="(element, index) in tabeditor" :key="index" min-size="15">
              <newediteditor :index="index" :element="element"></newediteditor>
            </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </v-row>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import { eventBus } from "@/main.js";

export default {
  components: {
    Splitpanes,
    Pane,
    EditToolbar: () => import("@/components/NewEditor/newEditToolbar"),

    newediteditor: () => import("@/components/NewEditor/newediteditor"),
    Drawer: () => import("@/components/Editor/Drawer"),
    SideTab: () => import("@/components/Editor/SideTab"),
    SideContent: () => import("@/components/Editor/SideContent"),
  },
  data() {
    return {
      loading: true,
      drawer: {
        open: true,
        selected: "MainList",
        on: [],
        // live or sandbox
      },
      tabeditor: null,
      panesize: 20,
    };
  },
  method: {
    llog() {
      console.log("added");
    },
  },
  watch: {
    tabeditor(val) {
      console.log("tabeditor", val);
    },
  },
  created() {
    var openWindow_id = window.my_special_setting;
    if (openWindow_id) {
      this.$store.commit("StartTab", openWindow_id);
    }
    this.tabeditor = this.$store.state.nowTab;

    // this.$http
    //     .get("/api/mycourse/" + this.courseData.code + "/coursedata")
    //     .then((res) => {
    //       if (res.data.result) {
    //         this.courseData.name = res.data.db_course.name
    //         this.courseData.code = res.data.db_course.code
    //         this.courseData.language = res.data.db_course.language
    //         this.courseData.prof = res.data.db_course.prof

    //         this.user_isprof = res.data.isprof
    //         this.$store.commit("setCourseData", res.data.db_course)
    //       } else {
    //         alert(res.data.message)
    //         this.$router.push("/mycourse")
    //       }
    //     })
    //     .then(() => {
    //       this.loading = false
    //     })
    //     .catch(function(error) {
    //       alert("error to getdata")
    //     })
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>


<style>
.wrap_splitpanes {
  position: absolute;
  left: 56px;
  padding-right: 56px;
  height: 100%;
}

.splitpanes__pane {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.splitpanes__splitter {
  background-color: #333333;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(195, 195, 195, 0.9);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 0;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -6px;
  right: -6px;
  height: 100%;
}
</style>
