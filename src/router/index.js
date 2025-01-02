import { createRouter, createWebHistory } from "vue-router";
import HostelsListViewComponent from "../views/HostelsListView.vue";
import HomeView from "../views/HomeView.vue";
import DocumentUploadView from "@/views/DocumentUploadView.vue";
import HostelFloorsViewComponent from "@/views/HostelFloorsView.vue";

// No need to use Vue.use(VueRouter) in Vue 3, this is for Vue 2

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      next(`/hostels`);
    },
  },
  {
    path: "/hostels",
    name: "Hostels", 
    component: HostelsListViewComponent,
    props: true,
  },
  {
    path: "/hostel/:id",
    name: "HostelDetail",
    beforeEnter: (to, from, next) => {
      if (!to.path.includes("/floor/")) {
        next(`/hostel/${to.params.id}/floor/2`);
      } else {
        next();
      }
    },
    props: true,
  },
  {
    path: "/hostel/:id/floor/:floorNumber?",
    beforeEnter: (to, from, next) => {
      if (!to.params.floorNumber) {
        next(`/hostel/${to.params.id}/floor/2`);
      } else {
        next();
      }
    },
    name: "HostelFloorsView",
    component: HostelFloorsViewComponent,
    props: true,
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
