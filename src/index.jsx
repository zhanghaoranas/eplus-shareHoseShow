import React from "react";
import { render } from "react-dom";
import App from "./App.jsx";
import "normalize.css";
import "./main.css";

render(<App></App>, document.getElementById("root"));

// const proxy = new Proxy(Promise.all, {
// 	apply: function (target, ctx, args) {
// 		return new Promise(resolve, reject => {
// 			Reflect.apply(...args).then(res => {
// 				resolve(res)
// 			}).finally(() => {
// 				console.log(321)
// 			})
// 		})
// 	}
// });

// function getPromise(arr) {
// 	return new Promise((resolve, reject) => {
// 		Promise.all(arr).then((res) => {
// 			resolve(res)
// 		}).finally(() => {
// 			console.log(321);
// 		})
// 	})
// }
