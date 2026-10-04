import api from "../utils/api/common";

const TrainingService = {
  getCurriculums: async (type) => {
    const response = await api.get("/training/curriculums", {
      params: { type },
    });
    return response.data;
  },

  getMaterials: async (curriculumId) => {
    const response = await api.get(`/training/curriculums/${curriculumId}/materials`);
    return response.data;
  },

  getMaterialDetail: async (materialId) => {
    const response = await api.get(`/training/materials/${materialId}`);
    return response.data;
  },

  saveNote: async (materialId, noteContent) => {
    const response = await api.post("/training/notes", {
      material_id: materialId,
      note_content: noteContent,
    });
    return response.data;
  },

  submitEvaluation: async (materialId, answers) => {
    const response = await api.post("/training/evaluations", {
      material_id: materialId,
      answers: answers,
    });
    return response.data;
  },

  getRankings: async () => {
    const response = await api.get("/training/rankings");
    return response.data;
  },

  getMyRanking: async () => {
    const response = await api.get("/training/my-ranking");
    return response.data;
  },
};

export default TrainingService;
