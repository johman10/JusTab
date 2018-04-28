import dayjs from 'dayjs';

export default function dateFormat (originalDate) {
  const date = dayjs(originalDate);
  const diff = date.startOf('day').diff(dayjs().startOf('day'), 'days');

  switch (diff) {
  case -2:
  case -3:
  case -4:
  case -5:
  case -6:
    return `last ${date.format('dddd')}`;
  case -1:
    return 'Yesterday';
  case 0:
    return 'Today';
  case 1:
    return 'Tomorrow';
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
    return date.format('dddd');
  default:
    return date.format('MMM D');
  }
}
