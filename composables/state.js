export const UseMyState = () => {
	const company = useState("company", () => null);
	const companyName = useState("companyName", () => null);
	const companyArray = useState("companyArray", () => null);
	const selectedCompany = useState("selectedCompany", () => null);
	const topHit = useState("topHit", () => null);
	const isRegComp = useState("isRegComp", () => false);

	return {
		company,
		companyName,
		selectedCompany,
		topHit,
		companyArray,
		isRegComp,
	};
};
