export function moveToFooterSmoothly(
	e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
	e.preventDefault();
	const footer = document.getElementById("footer-id");
	footer?.scrollIntoView({ behavior: "smooth" });
}
