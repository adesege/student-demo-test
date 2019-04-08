<template>
  <section id="student-list">
    <div class="card add-student-card" @click.prevent="goTo('/add')" style="width: 18rem;">
      <img src="/add-icon.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">Add a student</h5>
      </div>
    </div>
    <student-card :key="student.id" v-for="student in students" :option="student"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import StudentCard from '../components/StudentCard.vue';
import routerMixin from '../mixins/router.mixin';

export default {
  components: {
    StudentCard,
  },
  mixins: [routerMixin],
  async fetch(context) {
    await context.store.dispatch('student/getStudents');
  },
  computed: {
    ...mapGetters({
      students: 'student/students',
    }),
  },
};
</script>

<style lang="scss" scoped>
#student-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-row-gap: 1.5rem;

  .card {
    justify-self: center;
  }

  .add-student-card {
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }
  }
}
</style>
