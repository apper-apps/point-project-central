class IssueService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.tableName = 'issue_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "reporter_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "environment_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "project_id_c" } }
        ],
        orderBy: [{ fieldName: "created_at_c", sorttype: "DESC" }]
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching issues:", error?.response?.data?.message);
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
          { field: { Name: "title_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "reporter_c" } },
          { field: { Name: "assignee_c" } },
          { field: { Name: "environment_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "project_id_c" } }
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
        console.error(`Error fetching issue with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(issueData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: issueData.Name || issueData.name || issueData.title_c || issueData.title,
            title_c: issueData.title_c || issueData.title,
            type_c: issueData.type_c || issueData.type,
            description_c: issueData.description_c || issueData.description,
            priority_c: issueData.priority_c || issueData.priority,
            status_c: issueData.status_c || issueData.status,
            reporter_c: issueData.reporter_c || issueData.reporter,
            assignee_c: issueData.assignee_c || issueData.assignee,
            environment_c: issueData.environment_c || issueData.environment,
            due_date_c: issueData.due_date_c || issueData.dueDate,
            created_at_c: new Date().toISOString(),
            updated_at_c: new Date().toISOString(),
            project_id_c: issueData.project_id_c ? parseInt(issueData.project_id_c) : (issueData.projectId ? parseInt(issueData.projectId) : null)
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
        console.error("Error creating issue:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, issueData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: issueData.Name || issueData.name || issueData.title_c || issueData.title,
            title_c: issueData.title_c || issueData.title,
            type_c: issueData.type_c || issueData.type,
            description_c: issueData.description_c || issueData.description,
            priority_c: issueData.priority_c || issueData.priority,
            status_c: issueData.status_c || issueData.status,
            reporter_c: issueData.reporter_c || issueData.reporter,
            assignee_c: issueData.assignee_c || issueData.assignee,
            environment_c: issueData.environment_c || issueData.environment,
            due_date_c: issueData.due_date_c || issueData.dueDate,
            updated_at_c: new Date().toISOString(),
            project_id_c: issueData.project_id_c ? parseInt(issueData.project_id_c) : (issueData.projectId ? parseInt(issueData.projectId) : undefined)
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
        console.error("Error updating issue:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async remove(id) {
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
        console.error("Error deleting issue:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async searchIssues(query, filters = {}) {
    try {
      const apperClient = this.getApperClient();
      const whereConditions = [];
      
      // Text search
      if (query && query.trim()) {
        whereConditions.push({
          FieldName: "title_c",
          Operator: "Contains",
          Values: [query.trim()]
        });
      }
      
      // Filter by type
      if (filters.type && filters.type !== 'all') {
        whereConditions.push({
          FieldName: "type_c",
          Operator: "EqualTo",
          Values: [filters.type]
        });
      }
      
      // Filter by status
      if (filters.status && filters.status !== 'all') {
        whereConditions.push({
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: [filters.status]
        });
      }
      
      // Filter by priority
      if (filters.priority && filters.priority !== 'all') {
        whereConditions.push({
          FieldName: "priority_c",
          Operator: "EqualTo",
          Values: [filters.priority]
        });
      }
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "project_id_c" } }
        ],
        where: whereConditions
      };
      
      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching issues:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }
  
  // Static data for dropdowns (these remain the same)
  issueTypes = [
    { value: 'Bug', label: 'Bug' },
    { value: 'Feature Request', label: 'Feature Request' },
    { value: 'Improvement', label: 'Improvement' },
    { value: 'Task', label: 'Task' }
  ];

  priorityLevels = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Highest', label: 'Highest' }
  ];

  statusWorkflow = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Done', label: 'Done' }
  ];

  environments = [
    { value: 'Development', label: 'Development' },
    { value: 'Staging', label: 'Staging' },
    { value: 'Production', label: 'Production' }
  ];
}

const issueServiceInstance = new IssueService();

// Export individual methods for backward compatibility
export const getAll = () => issueServiceInstance.getAll();
export const getById = (id) => issueServiceInstance.getById(id);
export const create = (issueData) => issueServiceInstance.create(issueData);
export const update = (id, issueData) => issueServiceInstance.update(id, issueData);
export const remove = (id) => issueServiceInstance.remove(id);
export const searchIssues = (query, filters) => issueServiceInstance.searchIssues(query, filters);

export const issueTypes = issueServiceInstance.issueTypes;
export const priorityLevels = issueServiceInstance.priorityLevels;
export const statusWorkflow = issueServiceInstance.statusWorkflow;
export const environments = issueServiceInstance.environments;

export default issueServiceInstance;