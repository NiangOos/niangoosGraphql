import AbstractView from "./AbstractView.js";

export default class Signin extends AbstractView {
	constructor() {
		super();
		this.setTitle("Signin");
	}

	async getHTML() {
		return `
			<div id="form-ui">
				<form action="" method="post" id="form">
					<div id="form-body">
						<div id="welcome-lines">
							<div id="welcome-line-1">Graphql</div>
							<div id="welcome-line-2">Welcome to niangOos graphql profile</div>
						</div>
						<div id="input-area">
							<div class="form-inp">
								<input placeholder="Email Address" type="text" />
							</div>
							<div class="form-inp">
								<input placeholder="Password" type="password" />
							</div>
						</div>
						<div id="submit-button-cvr">
							<button id="submit-button" type="submit">Login</button>
						</div>
					</div>
				</form>
			</div>
		`;
	}

	async submitForm() {
		const nicknameOrEmail = document.getElementById("nicknameOrEmail");
		const password = document.getElementById("password");

		const userData = {
			nicknameOrEmail: nicknameOrEmail.value,
			password: password.value,
		};

		const jsonString = JSON.stringify(userData);
	}

	async render() {
		document.title = "Sign In";
		const container = document.getElementById("app");
		container.innerHTML = await this.getHTML();

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
