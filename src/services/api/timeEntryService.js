class TimeEntryService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.tableName = 'time_entry_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "task_id_c" } }
        ],
        orderBy: [{ fieldName: "date_c", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching time entries:", error?.response?.data?.message);
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
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "task_id_c" } }
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
        console.error(`Error fetching time entry with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(timeEntryData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: timeEntryData.Name || timeEntryData.name || `Time Entry - ${new Date().toLocaleDateString()}`,
            description_c: timeEntryData.description_c || timeEntryData.description,
            date_c: timeEntryData.date_c || timeEntryData.date,
            duration_c: parseFloat(timeEntryData.duration_c || timeEntryData.duration || 0),
            created_at_c: new Date().toISOString(),
            project_id_c: timeEntryData.project_id_c ? parseInt(timeEntryData.project_id_c) : (timeEntryData.projectId ? parseInt(timeEntryData.projectId) : null),
            task_id_c: timeEntryData.task_id_c ? parseInt(timeEntryData.task_id_c) : (timeEntryData.taskId ? parseInt(timeEntryData.taskId) : null)
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
        console.error("Error creating time entry:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, timeEntryData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: timeEntryData.Name || timeEntryData.name,
            description_c: timeEntryData.description_c || timeEntryData.description,
            date_c: timeEntryData.date_c || timeEntryData.date,
            duration_c: timeEntryData.duration_c ? parseFloat(timeEntryData.duration_c) : (timeEntryData.duration ? parseFloat(timeEntryData.duration) : undefined),
            project_id_c: timeEntryData.project_id_c ? parseInt(timeEntryData.project_id_c) : (timeEntryData.projectId ? parseInt(timeEntryData.projectId) : undefined),
            task_id_c: timeEntryData.task_id_c ? parseInt(timeEntryData.task_id_c) : (timeEntryData.taskId ? parseInt(timeEntryData.taskId) : undefined)
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
        console.error("Error updating time entry:", error?.response?.data?.message);
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
        console.error("Error deleting time entry:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async getByProjectId(projectId) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "task_id_c" } }
        ],
        where: [
          {
            FieldName: "project_id_c",
            Operator: "EqualTo",
            Values: [parseInt(projectId)]
          }
        ],
        orderBy: [{ fieldName: "date_c", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching time entries by project ID:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getByTaskId(taskId) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "task_id_c" } }
        ],
        where: [
          {
            FieldName: "task_id_c",
            Operator: "EqualTo",
            Values: [parseInt(taskId)]
          }
        ],
        orderBy: [{ fieldName: "date_c", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching time entries by task ID:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  // Alias method for timer functionality
  createFromTimer = (timeEntryData) => this.create(timeEntryData);
}

export default new TimeEntryService();