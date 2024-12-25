import { createRouter, createWebHistory } from "vue-router";
import HostelViewComponent from "../views/HostelView.vue";
import HomeView from "../views/HomeView.vue";
import DocumentUploadView from "@/views/DocumentUploadView.vue";

// No need to use Vue.use(VueRouter) in Vue 3, this is for Vue 2

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/hostels",
    name: "Hostels", 
    component: HostelViewComponent,
    props: true,
  },
  {
    path: "/hostels/:id",
    name: "HostelDetail", 
    component: HostelViewComponent,
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
