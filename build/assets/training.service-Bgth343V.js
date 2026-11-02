import { t as api } from "./common-qX05v8MF.js";
//#region src/services/training.service.js
var TrainingService = {
	getCurriculums: async (type) => {
		return (await api.get("/training/curriculums", { params: { type } })).data;
	},
	getMaterials: async (curriculumId) => {
		return (await api.get(`/training/curriculums/${curriculumId}/materials`)).data;
	},
	getMaterialDetail: async (materialId) => {
		return (await api.get(`/training/materials/${materialId}`)).data;
	},
	saveNote: async (materialId, noteContent) => {
		return (await api.post("/training/notes", {
			material_id: materialId,
			note_content: noteContent
		})).data;
	},
	submitEvaluation: async (materialId, answers) => {
		return (await api.post("/training/evaluations", {
			material_id: materialId,
			answers
		})).data;
	},
	getRankings: async () => {
		return (await api.get("/training/rankings")).data;
	},
	getMyRanking: async () => {
		return (await api.get("/training/my-ranking")).data;
	}
};
//#endregion
export { TrainingService as t };
