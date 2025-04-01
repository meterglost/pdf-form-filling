import { memo } from "react";

function Input({ setFile }: { setFile: (file: File) => void }) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFile(file);
		}
	};

	return <input type="file" name="" id="" onChange={handleChange} />;
}

export default memo(Input);
