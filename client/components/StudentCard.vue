<template>
  <div class="card student-card" style="width: 18rem;">
    <img :src="option.photoUrl" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{option.fullName}}</h5>
      <ul class="card-text">
        <li>
          <strong>BIRTH DATE:</strong>
          <i>
            <time :datetime="option.birthDate">{{option.birthDate}}</time>
          </i>
        </li>
        <li>
          <strong>HOBBIES:</strong>
          <i>{{option.hobbies.join(', ')}}</i>
        </li>
      </ul>
      <button @click="goTo('/edit/'+option.id)" class="btn btn-primary">Edit</button>
      <button class="btn btn-warning" @click.prevent="onDelete($event)" :data-id="option.id">Delete</button>
    </div>
  </div>
</template>

<script>
import routerMixin from '../mixins/router.mixin';

export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mixins: [routerMixin],
  methods: {
    onDelete(event) {
      const studentId = event.target.getAttribute('data-id');
      this.$swal({
        type: 'warning',
        title: `Delete ${this.option.fullName}`,
        text:
          'Are you sure you want to delete this student? This action cannot be reversed.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          await this.$store.dispatch('student/deleteStudent', {
            id: studentId,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.student-card {
  .card-text {
    padding: 0;
    list-style-type: none;
  }

  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-img-top {
    height: 250px;
    object-fit: cover;
    object-position: center;
  }
}
</style>
