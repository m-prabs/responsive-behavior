export default state => {
	return (
		<div>
			<div className="container fx">
				<h1>Container</h1>
				<div
					fx-container="row nowrap"
					fx-container-sm="column wrap"
					fx-container-xl="column nowrap"
					className="fx-container"
				>
					<div fx-item="0 1 auto" className="fx-item">
						Item 1
					</div>
					<div className="fx-item">Item 2</div>
					<div className="fx-item">Item 3</div>
					<div className="fx-item">Item 4</div>
				</div>
			</div>
		</div>
	);
};
