class ProjectService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.tableName = 'project_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "deadline_c" } },
          { field: { Name: "deliverables_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "chat_enabled_c" } },
          { field: { Name: "client_id_c" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "deadline_c" } },
          { field: { Name: "deliverables_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "chat_enabled_c" } },
          { field: { Name: "client_id_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching project with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(projectData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: projectData.Name || projectData.name,
            description_c: projectData.description_c || projectData.description,
            status_c: projectData.status_c || projectData.status || "Planning",
            deadline_c: projectData.deadline_c || projectData.deadline,
            deliverables_c: projectData.deliverables_c || projectData.deliverables,
            created_at_c: new Date().toISOString(),
            start_date_c: projectData.start_date_c || projectData.startDate,
            chat_enabled_c: projectData.chat_enabled_c !== undefined ? projectData.chat_enabled_c : (projectData.chatEnabled !== undefined ? projectData.chatEnabled : true),
            client_id_c: parseInt(projectData.client_id_c || projectData.clientId)
          }
        ]
      };
      
      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.results?.[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating project:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, projectData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: projectData.Name || projectData.name,
            description_c: projectData.description_c || projectData.description,
            status_c: projectData.status_c || projectData.status,
            deadline_c: projectData.deadline_c || projectData.deadline,
            deliverables_c: projectData.deliverables_c || projectData.deliverables,
            start_date_c: projectData.start_date_c || projectData.startDate,
            chat_enabled_c: projectData.chat_enabled_c !== undefined ? projectData.chat_enabled_c : (projectData.chatEnabled !== undefined ? projectData.chatEnabled : undefined),
            client_id_c: projectData.client_id_c ? parseInt(projectData.client_id_c) : (projectData.clientId ? parseInt(projectData.clientId) : undefined)
          }
        ]
      };
      
      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.results?.[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating project:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting project:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }
}

export default new ProjectService();