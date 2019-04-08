export default {
  computed: {
    getFlashMessage() {
      return {
        ...this.$store.getters['flashMessage/getFlashMessage'],
      };
    },
    toggleFlashMessage() {
      if (this.getFlashMessage.type && this.getFlashMessage.message) {
        this.$swal({
          title: this.getFlashMessage.title,
          html: this.getFlashMessage.message,
          type: this.getFlashMessage.type,
          onClose: () => this.$store.dispatch('flashMessage/deleteFlashMessage'),
          ...this.getFlashMessage.options,
        });
      }
    },
  },
};
