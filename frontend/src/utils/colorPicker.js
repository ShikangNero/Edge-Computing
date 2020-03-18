export function typeColorPicker(type) {
  switch (type) {
    case 'Classification':
      return 'orange';
    case 'Detection':
      return 'cyan';
    default:
      return '';
  }
}
