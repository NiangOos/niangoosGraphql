import AbstractView from "./AbstractView.js";
import * as func from "../js/functions.js";
import { navigateTo } from "../js/router.js";

export default class Signin extends AbstractView {
	constructor() {
		super();
		this.setTitle("Signin");
	}

	async getHTML() {
		return `
			<div id="form-ui">
				<form id="form">
					<div id="form-body">
						<div id="welcome-lines">
							<div id="welcome-line-1">Graphql</div>
							<div id="welcome-line-2">Welcome to niangOos graphql profile</div>
						</div>
						<div id="input-area">
							<div class="form-inp">
								<input id="nicknameOrEmail" placeholder="Email or Username" type="text" />
							</div>
							<div class="form-inp">
								<input id="pwd" placeholder="Password" type="password" />
							</div>
						</div>
						<div id="submit-button-cvr">
							<button id="submit-button" type="submit">Login</button>
						</div>
						<div id="forgot-pass">
							<p id="errortxtfield"></p>
						</div>
					</div>
				</form>
			</div>
		`;
	}

	// async submitForm() {
	// 	const nicknameOrEmail = document.getElementById("nicknameOrEmail");
	// 	const password = document.getElementById("password");

	// 	const userData = {
	// 		nicknameOrEmail: nicknameOrEmail.value,
	// 		password: password.value,
	// 	};

	// 	const jsonString = JSON.stringify(userData);
	// }

	async render() {
		document.title = "Sign In";

		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			navigateTo("/profile");
			console.log("You already connected");
			return;
		}

		const container = document.getElementById("app");
		container.innerHTML = await this.getHTML();

		document.getElementById("form").addEventListener("submit", async (event) => {
			event.preventDefault();
			const nicknameOrEmail = document.getElementById("nicknameOrEmail").value;
			const pwd = document.getElementById("pwd").value;

			if (!nicknameOrEmail || !pwd) {
				func.DisplayError("Please fill in all fields");
				return;
			}

			const credentials = `${nicknameOrEmail}:${pwd}`;
			const base64Credentials = btoa(credentials);

			try {
				const response = await fetch("https://learn.zone01dakar.sn/api/auth/signin", {
					method: "POST",
					headers: {
						Authorization: `Basic ${base64Credentials}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					if (response.status === 401) {
						func.DisplayError("Invalid credentials");
					}
					if (response.status === 403) {
						func.DisplayError("Wrong password");
					}
					return;
				}

				const responseData = await response.json();
				localStorage.setItem("jwt", responseData);

				navigateTo("/profile");
			} catch (error) {
				func.DisplayError("Something went wrong !");
				console.log(error);
			}
		});

		// const eyePwd = document.getElementById("eyepwd");
		// const passwordInput = document.getElementById("password");

		// eyePwd.addEventListener("click", function () {
		// 	func.TogglePasswordVisibility(passwordInput, eyePwd);
		// });

		// document.getElementById("login").addEventListener("submit", (event) => {
		// 	event.preventDefault();
		// 	this.submitForm();
		// });
	}
}

/* <span id="eyepwd">
	<svg xmlns="http://www.w3.org/2000/svg" color="#2875C7" width="22" height="22" viewBox="0 0 48 48">
		<g fill="none" stroke="currentColor" stroke-width="4">
			<path stroke-linejoin="round" d="M24 41c9.941 0 18-8.322 18-14c0-5.678-8.059-14-18-14S6 21.328 6 27c0 5.672 8.059 14 18 14Z" clip-rule="evenodd" />
			<path stroke-linejoin="round" d="M24 33a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" />
			<path stroke-linecap="round" d="m13.264 11.266l2.594 3.62m19.767-3.176l-2.595 3.62M24.009 7v6" />
		</g>
	</svg>
</span>; */
