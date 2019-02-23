
export const findParent = (el, matchParentCB) => {
  const parent = el.parentElement;
  if (document.body === el || el.parentElement === null) return null;

  if (matchParentCB(el)) return el;

  return findParent(el.parentElement, matchParentCB);
};

// Set Row focus onClick
// ----------------------------------

export const setRowFocus = () => {
  const activeEl = document.activeElement;
  const activeElRow = findParent(activeEl, isFormRow);
  const rows = [].slice.call(document.querySelectorAll('.form-item'));

  rows.forEach((row) => {
    if (row === activeElRow) {
      row.classList.add('has-focus');
    } else {
      row.classList.remove('has-focus');
    }
  });
};
const isFormRow = el => el.classList.contains('form-item');

// ----------------------------------


// * FORMS
// ----------------------------------


export const validateField = (field) => {
  if (field.value) {
    field.setAttribute('aria-invalid', false);
    console.log(field.value);
  } else {
    field.setAttribute('aria-invalid', true);
    console.log('true');
    console.log(field.value);
  }

  if (field.getAttribute('type') === 'email') {
    validateEmailField(field);
  }
};

const validateEmailField = (emailField) => {
  if (!validateEmailValue(emailField.value)) {
    emailField.setAttribute('aria-invalid', false);
  } else {
    emailField.setAttribute('aria-invalid', true);
  }
};
const validateEmailValue = (emailValue) => {
  emailValue = emailValue.trim();
  const match = emailValue.match(/@/g);

  if (!match || match.length !== 1) {
    return false;
  }

  if (emailValue[0] === '@' || emailValue[emailValue.length - 1] === '@') {
    return false;
  }
  return true;
};


export const validateForm = (formValues) => {
  const form = document.querySelector('form');
  const requiredFields = [].slice.call(form.querySelectorAll('[required]'));

  // * Material-UI will not let me pass the "required" prop to the input on a selector.  Here's a quick hack
  const hiddenFields = [].slice.call(form.querySelectorAll('input[type="hidden"]'));

  const fieldsToValidate = [...requiredFields, ...hiddenFields];
  fieldsToValidate.forEach((field) => {
    validateField(field);
  });

  return fieldsToValidate.every(field => field.getAttribute('aria-invalid') === 'false');
};

export const validateOnBlur = (ev) => {
  if (['SELECT', 'INPUT', 'TEXTAREA'].indexOf(ev.target.tagName) === -1) {
    return;
  }

  if (ev.target.hasAttribute('required') || ev.target.getAttribute('type') === 'hidden') {
    validateField(ev.target);
  }
};


// * Util function to increase opacity on downwards scroll
/* ----------------------------------
const opacityOnScroll = () => {
  window.onscroll =()=>{
    const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
    var maxScrollHeight = Math.ceil(window.innerHeight);
    const currentOpacity = Math.min( (this.state.currentScrollHeight/maxScrollHeight) , 1);
    if (currentOpacity === 1){null}
    if (this.state.currentScrollHeight !== newScrollHeight){
        this.setState({currentScrollHeight: newScrollHeight})
    }
  }
}
// maxScrollHeight is the adjustment for when you'd like the scroll function to start effecting opacity
var maxScrollHeight = Math.ceil(window.innerHeight-200);
const backgroundOpacity = Math.min( (this.state.currentScrollHeight/maxScrollHeight) , 1) || 0

// ----------------------------------
*/
