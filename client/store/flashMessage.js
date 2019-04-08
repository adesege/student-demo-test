export const state = () => ({
  type: '',
  title: '',
  message: '',
  options: {},
});

export const mutations = {
  ADD_FLASH_MESSAGE: (store, payload) => {
    let { message } = payload;
    if (Array.isArray(message)) {
      message = message.join('<br/>');
    }
    store.message = message;
    store.title = payload.title || '';
    store.type = payload.type;
    store.options = payload.options || {};
  },
  DELETE_FLASH_MESSAGE: (store) => {
    store.message = '';
    store.type = '';
    store.title = '';
    store.options = {};
  },
};

export const getters = {
  getFlashMessage(store) {
    return store;
  },
};

export const actions = {
  addFlashMessage(context, payload) {
    context.commit('ADD_FLASH_MESSAGE', payload);
  },
  deleteFlashMessage(context) {
    context.commit('DELETE_FLASH_MESSAGE');
  },
};
