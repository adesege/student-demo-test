import serialize from '@octetstream/object-to-form-data';
import { transformValidationError } from '~/helpers';

export const state = () => ({
  students: [],
  isLoading: false,
});

export const mutations = {
  SET_STUDENTS: (store, payload) => {
    store.students = payload;
  },
  ADD_NEW_STUDENT: (store, payload) => {
    const students = store.students || [];
    store.students = [payload, ...students];
  },
  EDIT_STUDENT: (store, payload) => {
    const index = store.students.findIndex(student => student.id === payload.id);
    if (index !== -1) {
      store.students.splice(index, 0);
      store.students.unshift(payload);
    }
  },
  DELETE_STUDENT: (store, studentId) => {
    const index = store.students.findIndex(student => student.id === studentId);
    if (index !== -1) {
      store.students.splice(index, 1);
    }
  },
  SET_IS_LOADING: (store, isLoading) => {
    store.isLoading = isLoading;
  },
};

export const getters = {
  students(store) {
    return store.students;
  },
  student(store) {
    return studentId => store.students.find(value => value.id === studentId);
  },
  isLoading(store) {
    return store.isLoading;
  },
};
export const actions = {
  async getStudents(context, payload) {
    const requestUrl = payload && Object.prototype.hasOwnProperty.call(payload, 'studentId')
      ? `/students/${payload.studentId}`
      : '/students';
    try {
      const response = await this.$axios.get(requestUrl).catch(error => Promise.reject(error.response));
      context.commit('SET_STUDENTS', response.data.students);
      return Promise.resolve(response);
    } catch (error) {
      if (error.status === 404 && payload.studentId) {
        return this.$router.push('/');
      }
      let errorMessage = error.data.message;
      if (error.status === 400) {
        errorMessage = transformValidationError(error.data.message);
      }
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'error',
          message: errorMessage,
        },
        { root: true },
      );
    }
  },
  async addStudent(context, payload) {
    context.commit('SET_IS_LOADING', true);
    try {
      const response = await this.$axios
        .post('/students', serialize(payload), {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .catch(error => Promise.reject(error.response));
      context.commit('SET_IS_LOADING', false);
      context.commit('ADD_NEW_STUDENT', response.data);
      this.$router.push('/');
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'success',
          message: 'Student added successfully',
        },
        { root: true },
      );
    } catch (error) {
      context.commit('SET_IS_LOADING', false);
      let errorMessage = error.data.message;
      if (error.status === 400) {
        errorMessage = transformValidationError(error.data.message);
      }
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'error',
          message: errorMessage,
        },
        { root: true },
      );
    }
  },
  async editStudent(context, payload) {
    context.commit('SET_IS_LOADING', true);
    try {
      const response = await this.$axios
        .patch(`/students/${payload.id}`, serialize(payload), {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .catch(error => Promise.reject(error.response));
      context.commit('SET_IS_LOADING', false);
      context.commit('EDIT_STUDENT', response.data);
      this.$router.push('/');
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'success',
          message: 'Student edited successfully',
        },
        { root: true },
      );
    } catch (error) {
      context.commit('SET_IS_LOADING', false);
      let errorMessage = error.data.message;
      if (error.status === 400) {
        errorMessage = transformValidationError(error.data.message);
      }
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'error',
          message: errorMessage,
        },
        { root: true },
      );
    }
  },
  async deleteStudent(context, payload) {
    try {
      await this.$axios.delete(`/students/${payload.id}`).catch(error => Promise.reject(error.response));
      context.commit('DELETE_STUDENT', payload.id);
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'success',
          message: 'Student deleted successfully',
        },
        { root: true },
      );
    } catch (error) {
      let errorMessage = error.data.message;
      if (error.status === 400) {
        errorMessage = transformValidationError(error.data.message);
      }
      context.dispatch(
        'flashMessage/addFlashMessage',
        {
          type: 'error',
          message: errorMessage,
        },
        { root: true },
      );
    }
  },
};
