import mergeClasses from '@/util/merge-classes';
import './style.scss';

export default {
  functional: true,
  render: (
    createElement,
    { props: { icon }, data: { class: classes, staticClass } }
  ) =>
    createElement('i', {
      class: mergeClasses('icon', `icon--${icon}`, classes, staticClass)
    })
};
