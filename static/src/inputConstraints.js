module.exports = {
  text: ['required', 'maxlength'], // <textarea> element
  number: ['min', 'max', 'required', 'step']
  checkbox: [],
  url: ['pattern', 'required', 'maxlength'],
  date: ['min', 'max', 'required', 'step'],
  time: ['min', 'max', 'required', 'step'],
  datetime: ['min', 'max', 'required', 'step'], // datetime-local
  email: ['pattern', 'required', 'maxlength'],
  color: ['required']
}
