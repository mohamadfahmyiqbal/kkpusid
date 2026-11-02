//#region src/pages/program/arisan/components/arisanHelpers.js
var API_BASE_URL = "https://api.kkpus.id/api";
var getApiUrl = (endpoint) => {
	return `${"https://api.kkpus.id/api".endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`}/${endpoint}`;
};
var formatCurrency = (amount) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(amount || 0);
};
var buildSummaryData = (arisanData) => {
	if (!arisanData) return {
		"Kategori Arisan": "-",
		"Target Nominal": "Rp -",
		"Setoran per Bulan": "Rp -",
		"Jumlah Peserta": "-",
		"Durasi Program": "-"
	};
	return {
		"Kategori Arisan": arisanData.category || "-",
		"Target Nominal": formatCurrency(arisanData.target_amount),
		"Setoran per Bulan": formatCurrency(arisanData.monthly_contribution),
		"Jumlah Peserta": `${arisanData.participant_count || 0}/${arisanData.max_participants || 0} Orang`,
		"Durasi Program": `${arisanData.cooperation_months || 0} Bulan`
	};
};
//#endregion
export { getApiUrl as n, buildSummaryData as t };
