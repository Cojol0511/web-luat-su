var bannerGranim = new Granim({
	element: '#banner-canvas',
	name: 'basic-gradient',
	direction: 'left-right',
	opacity: [1, 1],
	states : {
		"default-state": {
			gradients: [
				['#ffffff', '#F7A818'],
				['#F7A818', '#ffffff'],
				//['#EB3349', '#F45C43'],
				//['#FF8008', '#FFC837'],
				//['#4CB8C4', '#3CD3AD'],
				//['#24C6DC', '#514A9D'],
				//['#FF512F', '#DD2476'],
				//['#DA22FF', '#9733EE']
			],
			transitionSpeed: 7000,
			loop: true
		},
	}
});