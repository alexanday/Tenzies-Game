export default function Die(props) {
	return (
		<div>
			<div onClick={props.handleClick} className={props.style}>
				<h1 className="die--num">{props.value}</h1>
			</div>
		</div>
	);
}
