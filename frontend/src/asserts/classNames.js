import cn from 'classnames';

//const changeClassName = (...classNames) => cn(classNames);

const changeClassName = (addedClassName = '', flag = true, ...classNames) => {
	/*console.log(classNames);
	console.log('added', addedClassName);
	if (addedClassName === '') {
		console.log('test')
		return cn(classNames);
	}*/
	return cn(classNames, {
		[`${addedClassName}`]: flag,
	});
};

export default changeClassName;

/*

	const buttonType = 'primary';
const btnClass = cn('btn', `btn-${buttonType}`);
console.log(btnClass); // 'btn btn-primary'
// Или что то же самое
// const btnClass = cn('btn', {
//   [`btn-${buttonType}`]: true
// });

*/