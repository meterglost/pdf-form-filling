import Import from "@components/Import";
import Export from "@components/Export";
import RenderHtml from "@components/RenderHtml";
import RenderPdf from "@components/RenderPdf";

import { useState, useEffect, useRef, useCallback } from "react";

export default function App() {
	const [templateFile, setTemplateFile] = useState<File | undefined>();
	const [templateUrl, setTemplateUrl] = useState<string | undefined>();
	const [templateInput, setTemplateInput] = useState<Record<string, string>>({});
	const [renderedUrl, setRenderedUrl] = useState<string | undefined>();

	useEffect(() => {
		if (templateFile) {
			const formData = new FormData();
			formData.append("file", templateFile);

			fetch("http://localhost:3000/render/html", {
				method: "POST",
				body: formData,
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to upload and render the file.");
					}
					return response.blob();
				})
				.then((blob) => {
					const url = URL.createObjectURL(blob);
					setTemplateUrl(url);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [templateFile]);

	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedRender = useCallback((file: File, input: Record<string, string>) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("input", JSON.stringify(input));

		fetch("http://localhost:3000/render/pdf", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to upload and render the file.");
				}
				return response.blob();
			})
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				setRenderedUrl(url);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	useEffect(() => {
		if (templateFile) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			debounceTimerRef.current = setTimeout(() => {
				debouncedRender(templateFile, templateInput);
			}, 1000);

			return () => {
				if (debounceTimerRef.current) {
					clearTimeout(debounceTimerRef.current);
				}
			};
		}
	}, [templateFile, templateInput, debouncedRender]);

	const handleInputChange = (name: string, value: string) => {
		setTemplateInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="grid grid-cols-2 h-full divide-x-2 *:p-2">
			<div className="flex flex-col gap-2">
				<div className="flex-0">
					<Import setFile={setTemplateFile} />
				</div>
				<div className="flex-1">
					<RenderHtml url={templateUrl} onInputChange={handleInputChange} />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex-0">
					<Export />
				</div>
				<div className="flex-1">
					<RenderPdf url={renderedUrl} />
				</div>
			</div>
		</div>
	);
}
