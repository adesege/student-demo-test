<template>
  <student-form :formData="formData" @onProcessPhoto="handlePhoto" @onSubmit="addStudent()"/>
</template>

<script>
import StudentForm from '~/components/StudentForm.vue';

export default {
  components: {
    StudentForm,
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        photo: '',
        hobbies: [],
      },
    };
  },
  methods: {
    handlePhoto(file) {
      this.formData.photo = file;
    },
    async addStudent() {
      await this.$store.dispatch('student/addStudent', this.formData);
    },
  },
};
</script>
