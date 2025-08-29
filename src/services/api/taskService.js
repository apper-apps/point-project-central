class TaskService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.tableName = 'task_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "assigned_to_c" } }
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
        console.error("Error fetching tasks:", error?.response?.data?.message);
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
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "assigned_to_c" } }
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
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(taskData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: taskData.Name || taskData.name,
            description_c: taskData.description_c || taskData.description,
            completed_c: taskData.completed_c !== undefined ? taskData.completed_c : (taskData.completed || false),
            priority_c: taskData.priority_c || taskData.priority || "Medium",
            start_date_c: taskData.start_date_c || taskData.startDate,
            due_date_c: taskData.due_date_c || taskData.dueDate,
            created_at_c: new Date().toISOString(),
            project_id_c: taskData.project_id_c ? parseInt(taskData.project_id_c) : (taskData.projectId ? parseInt(taskData.projectId) : null),
            assigned_to_c: taskData.assigned_to_c ? parseInt(taskData.assigned_to_c) : (taskData.assignedTo ? parseInt(taskData.assignedTo) : null)
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
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, taskData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: taskData.Name || taskData.name,
            description_c: taskData.description_c || taskData.description,
            completed_c: taskData.completed_c !== undefined ? taskData.completed_c : taskData.completed,
            priority_c: taskData.priority_c || taskData.priority,
            start_date_c: taskData.start_date_c || taskData.startDate,
            due_date_c: taskData.due_date_c || taskData.dueDate,
            project_id_c: taskData.project_id_c ? parseInt(taskData.project_id_c) : (taskData.projectId ? parseInt(taskData.projectId) : undefined),
            assigned_to_c: taskData.assigned_to_c ? parseInt(taskData.assigned_to_c) : (taskData.assignedTo ? parseInt(taskData.assignedTo) : undefined)
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
        console.error("Error updating task:", error?.response?.data?.message);
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
        console.error("Error deleting task:", error?.response?.data?.message);
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
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "assigned_to_c" } }
        ],
        where: [
          {
            FieldName: "project_id_c",
            Operator: "EqualTo",
            Values: [parseInt(projectId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by project ID:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  // Alias methods for backward compatibility
  markComplete = (id) => this.update(id, { completed_c: true });
  updateStatus = (id, status) => this.update(id, { status_c: status });
}

export default new TaskService();