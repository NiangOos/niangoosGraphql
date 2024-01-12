export function DisplayError(errorMessage) {
	const errortxtfield = document.getElementById("errortxtfield");
	errortxtfield.innerText = errorMessage;
	setTimeout(() => {
		errortxtfield.innerText = "";
	}, 3000);
}

export function TogglePasswordVisibility(inputElement, spaninput) {
	if (inputElement.type === "password") {
		inputElement.type = "text";
		spaninput.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" color="#2875C7" width="22" height="22" viewBox="0 0 256 256">
				<path
					fill="currentColor"
					d="M228 175a8 8 0 0 1-10.92-3l-19-33.2A123.23 123.23 0 0 1 162 155.46l5.87 35.22a8 8 0 0 1-6.58 9.21a8.4 8.4 0 0 1-1.29.11a8 8 0 0 1-7.88-6.69l-5.77-34.58a133.06 133.06 0 0 1-36.68 0l-5.77 34.58A8 8 0 0 1 96 200a8.4 8.4 0 0 1-1.32-.11a8 8 0 0 1-6.58-9.21l5.9-35.22a123.23 123.23 0 0 1-36.06-16.69L39 172a8 8 0 1 1-13.94-8l20-35a153.47 153.47 0 0 1-19.3-20a8 8 0 1 1 12.46-10c16.6 20.54 45.64 45 89.78 45s73.18-24.49 89.78-45a8 8 0 1 1 12.44 10a153.47 153.47 0 0 1-19.3 20l20 35a8 8 0 0 1-2.92 11Z"
				/>
			</svg>
		`;
	} else {
		inputElement.type = "password";
		spaninput.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" color="#2875C7" width="22" height="22" viewBox="0 0 48 48">
				<g fill="none" stroke="currentColor" stroke-width="4">
					<path
						stroke-linejoin="round"
						d="M24 41c9.941 0 18-8.322 18-14c0-5.678-8.059-14-18-14S6 21.328 6 27c0 5.672 8.059 14 18 14Z"
						clip-rule="evenodd"
					/>
					<path stroke-linejoin="round" d="M24 33a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" />
					<path stroke-linecap="round" d="m13.264 11.266l2.594 3.62m19.767-3.176l-2.595 3.62M24.009 7v6" />
				</g>
			</svg>
		`;
	}
}
