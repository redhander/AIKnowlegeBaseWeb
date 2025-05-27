import { createRouter, createWebHistory } from 'vue-router';
import KnowledgeBase from './components/KnowledgeBase.vue';

const routes = [
  {
    path: '/',
    component: KnowledgeBase
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;