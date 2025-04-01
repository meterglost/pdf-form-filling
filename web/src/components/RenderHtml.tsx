import { memo, useRef, useEffect } from "react";

function RenderHtml({
	url,
	onInputChange,
}: { url: string | undefined; onInputChange?: (name: string, value: string) => void }) {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const iframe = iframeRef.current;

		if (iframe && url) {
			const inputHandler = () => {
				if (iframe.contentDocument) {
					for (const input of iframe.contentDocument.querySelectorAll("input, textarea, select")) {
						input.addEventListener("input", (event) => {
							const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
							if (onInputChange && target.name) {
								onInputChange(target.name, target.value);
							}
						});
					}
				}
			};

			iframe.addEventListener("load", inputHandler, { once: true });

			return () => {
				iframe.removeEventListener("load", inputHandler);
			};
		}
	}, [url, onInputChange]);

	if (!url) {
		return <div className="w-full h-full bg-gray-200 text-center content-center">No file selected</div>;
	}

	return <iframe title="template" ref={iframeRef} src={`${url}#toolbar=0`} className="w-full h-full" />;
}

export default memo(RenderHtml);
