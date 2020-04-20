import './style.styl';

const proxy = new Proxy(Promise.all, {
	apply: function (target, ctx, args) {
		return new Promise(resolve, reject => {
			Reflect.apply(...args).then(res => {
				resolve(res)
			}).finally(() => {
				console.log(321)
			})
		})
	}
});





function getPromise(arr) {
	return new Promise((resolve, reject) => {
		Promise.all(arr).then((res) => {
			resolve(res)
		}).finally(() => {
			console.log(321);
		})
	})
}
getPromiset().then()