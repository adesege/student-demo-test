const $avatarPreview = window.$('.avatar-preview');
const $hobbies = window.$('select#hobbies')[0];

const createHobbiesOption = () => {
  const fragment = document.createDocumentFragment();
  const hobbiesList = ['Singing', 'Dancing', 'Hiking', 'Swimming'];

  hobbiesList.forEach((hobby) => {
    const option = document.createElement('option');
    option.textContent = hobby;
    option.value = hobby;
    fragment.appendChild(option);
  });

  $hobbies.appendChild(fragment);
};

const addDefaultAvatarPreview = () => {
  $avatarPreview.attr(
    'style',
    "background-image: url('/assets/img/add-icon.png')",
  );
};

window.$(document).ready(() => {
  window.addEventListener('load', () => {
    createHobbiesOption();
    addDefaultAvatarPreview();
  });
});

window.getInputValue = selector => window.$(selector).val();

window.processPhoto = (target) => {
  const [file] = target.files;
  if (file) {
    $avatarPreview.attr(
      'style',
      `background-image: url(${window.URL.createObjectURL(file)})`,
    );
    window.formData.photo = file;
  }
};
