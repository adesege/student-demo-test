<template>
  <form @submit.prevent="onSubmit($event)" novalidate>
    <div class="d-flex w-50 m-auto align-items-center">
      <input
        @change="processPhoto($event)"
        type="file"
        class="form-control avatar-input"
        id="photo"
        accept="image/*"
        :required="!formData.photo"
      >
      <label for="photo" class="avatar-container mb-3">
        <div
          class="avatar-preview"
          :style="{backgroundImage: `url(${formData.photo || '/add-icon.png'})`}"
          ref="photo-preview"
        ></div>
      </label>
      <span class="invalid-feedback flex-1 text-center">Please choose a photo</span>
    </div>
    <div class="form-row mb-3">
      <div class="col">
        <input
          v-model="formData.firstName"
          type="text"
          class="form-control"
          placeholder="First name"
          required
        >
      </div>
      <div class="col">
        <input
          v-model="formData.lastName"
          type="text"
          class="form-control"
          placeholder="Last name"
          required
        >
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group">
          <label for="birthDate">Birth Date</label>
          <input
            v-model="formData.birthDate"
            v-mask="'##-##-####'"
            type="text"
            id="birthDate"
            class="form-control"
            placeholder="DD-MM-YYY"
            required
          >
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="hobbies">Hobbies</label>
          <select v-model="formData.hobbies" multiple class="form-control" id="hobbies" required>
            <option v-for="item in hobbiesList">{{item}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <button @click.prevent="goTo('/')" class="btn btn-primary flex-1 mr-3">Back</button>
      <button type="submit" class="btn btn-success btn-block" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import routerMixin from '../mixins/router.mixin';

export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hobbiesList: ['Singing', 'Dancing', 'Hiking', 'Swimming'],
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'student/isLoading',
    }),
  },
  mixins: [routerMixin],
  methods: {
    processPhoto(event) {
      const file = event.target.files[0];
      if (file) {
        const $preview = this.$refs['photo-preview'];
        $preview.setAttribute(
          'style',
          `background-image: url(${window.URL.createObjectURL(file)})`,
        );
        this.$emit('onProcessPhoto', file);
      }
    },
    onSubmit(event) {
      if (!event.target.checkValidity()) {
        return event.target.classList.add('was-validated');
      }

      this.$emit('onSubmit', event);
    },
  },
};
</script>

<style lang="scss">
.avatar-input {
  height: 0;
  width: 0;
  overflow: hidden;
  position: absolute;
  left: -1000000px;
}

.avatar-container {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: auto;
  cursor: pointer;
  padding: 0;

  .avatar-preview {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.25rem;
  }
}
</style>
