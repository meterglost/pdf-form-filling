import { memo } from "react";

function RenderPdf({ url }: { url: string | undefined }) {
	if (!url) {
		return <div className="w-full h-full bg-gray-200 text-center content-center">No file selected</div>;
	}

	return <iframe title="rendered" key={url} src={`${url}#toolbar=0`} className="w-full h-full" />;
}

export default memo(RenderPdf);
