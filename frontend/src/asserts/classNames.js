import cn from 'classnames';

const changeClassName = (addedClassName = '', flag = true, ...classNames) => cn(classNames, {
  [`${addedClassName}`]: flag,
});
export default changeClassName;
