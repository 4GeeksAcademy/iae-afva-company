"use strict";

(() => {
	const form = document.getElementById("application-form");

	if (!form) {
		return;
	}

	const fields = Array.from(form.querySelectorAll("input[name], textarea[name]"));
	const status = document.getElementById("form-status");
	const touchedFields = new Set();

	function getLocalDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	function isRealDate(value) {
		const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

		if (!match) {
			return false;
		}

		const [, year, month, day] = match.map(Number);
		const date = new Date(Date.UTC(year, month - 1, day));

		return date.getUTCFullYear() === year
			&& date.getUTCMonth() === month - 1
			&& date.getUTCDate() === day;
	}

	function validateField(field) {
		const value = field.value;

		switch (field.name) {
			case "name": {
				const name = value.trim();
				if (!name) return "Introduce tu nombre.";
				if (name.length < 2 || name.length > 100) {
					return "El nombre debe tener entre 2 y 100 caracteres.";
				}
				return "";
			}
			case "email":
				if (!value.trim()) return "Introduce tu correo electrónico.";
				if (field.validity.typeMismatch) {
					return "Introduce un correo electrónico válido.";
				}
				return "";
			case "phone": {
				if (!value.trim()) return "Introduce tu teléfono.";
				if (!/^\+?[\d\s()-]+$/.test(value)) {
					return "Usa solo dígitos, un + inicial y separadores habituales.";
				}
				const digitCount = value.replace(/\D/g, "").length;
				if (digitCount < 9 || digitCount > 15) {
					return "Introduce entre 9 y 15 dígitos.";
				}
				return "";
			}
			case "birth-date":
				if (!value) return "Selecciona tu fecha de nacimiento.";
				if (!isRealDate(value)) return "Introduce una fecha válida.";
				if (value > getLocalDate()) return "La fecha no puede ser futura.";
				return "";
			case "age": {
				if (!value.trim()) return "Introduce tu edad.";
				const age = Number(value);
				if (!Number.isInteger(age) || age < 0 || age > 120) {
					return "La edad debe ser un número entero entre 0 y 120.";
				}
				return "";
			}
			case "comments":
				if (value.length > 500) {
					return "Los comentarios no pueden superar 500 caracteres.";
				}
				return "";
			default:
				return "";
		}
	}

	function renderError(field, message) {
		const error = document.getElementById(`${field.id}-error`);
		const invalid = Boolean(message);

		error.textContent = message;
		error.classList.toggle("hidden", !invalid);
		field.setAttribute("aria-invalid", String(invalid));
		field.classList.toggle("border-[#a13f32]", invalid);
		field.classList.toggle("bg-[#fff7f4]", invalid);
		field.classList.toggle("focus-visible:ring-[#a13f32]", invalid);
	}

	function validateAndRender(field) {
		const message = validateField(field);
		renderError(field, message);
		return !message;
	}

	function clearStatus() {
		status.textContent = "";
	}

	const birthDate = document.getElementById("birth-date");
	birthDate.max = getLocalDate();

	form.addEventListener("focusout", (event) => {
		const field = event.target;
		if (!fields.includes(field)) return;

		touchedFields.add(field);
		validateAndRender(field);
	});

	form.addEventListener("input", (event) => {
		const field = event.target;
		if (!fields.includes(field)) return;

		clearStatus();
		if (touchedFields.has(field)) {
			validateAndRender(field);
		}
	});

	form.addEventListener("change", (event) => {
		const field = event.target;
		if (fields.includes(field) && touchedFields.has(field)) {
			validateAndRender(field);
		}
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		touchedFields.clear();

		const invalidFields = fields.filter((field) => {
			touchedFields.add(field);
			return !validateAndRender(field);
		});

		if (invalidFields.length > 0) {
			status.textContent = "Revisa los campos marcados antes de continuar.";
			invalidFields[0].focus();
			return;
		}

		status.textContent = "Formulario validado correctamente. Envío simulado: no se han enviado ni guardado datos";
	});

	form.addEventListener("reset", () => {
		window.setTimeout(() => {
			touchedFields.clear();
			fields.forEach((field) => renderError(field, ""));
			clearStatus();
		}, 0);
	});
})();