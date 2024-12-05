import { createRouter, createWebHistory } from "vue-router";
import HostelView from "../views/HostelView.vue";
// import HomeView from "../views/HomeView.vue";
import DocumentUploadView from "@/views/DocumentUploadView.vue";

// No need to use Vue.use(VueRouter) in Vue 3, this is for Vue 2

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: HomeView,
  // },
  {
    path: "/",
    name: "Hostel",
    component: HostelView,
    props: true,
  },
  {
    path: "/room-select",
    name: "room-select",
    component: HostelView,
  },
  {
    path: "/upload-document",
    name: "document-upload",
    component: DocumentUploadView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
