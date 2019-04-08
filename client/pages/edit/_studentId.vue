<template>
  <student-form :formData="formData" @onProcessPhoto="handlePhoto" @onSubmit="editStudent()"/>
</template>

<script>
import StudentForm from '~/components/StudentForm.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    StudentForm,
  },
  head() {
    return {
      title: `Edit ${this.formData.firstName}`,
    };
  },
  async mounted() {
    if (!this.student) {
      await this.$store.dispatch('student/getStudents', {
        studentId: this.studentId,
      });
    } else {
      this.formData = this.formattedFormData;
    }
  },
  data() {
    return {
      formData: {
        id: '',
        firstName: '',
        lastName: '',
        photo: '',
        hobbies: [],
        birthDate: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      getStudent: 'student/student',
    }),
    studentId() {
      return this.$router.history.current.params.studentId;
    },
    student() {
      return this.getStudent(this.studentId);
    },
    formattedFormData() {
      return {
        id: this.studentId,
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        birthDate: this.student.birthDate,
        photo: this.student.photoUrl,
        hobbies: this.student.hobbies,
      };
    },
  },
  watch: {
    student() {
      this.formData = this.formattedFormData;
    },
  },
  methods: {
    handlePhoto(file) {
      this.formData.photo = file;
    },
    async editStudent() {
      await this.$store.dispatch('student/editStudent', this.formData);
    },
  },
};
</script>
