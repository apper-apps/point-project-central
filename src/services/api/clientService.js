class ClientService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.tableName = 'client_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "company_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "website_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "created_at_c" } }
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
        console.error("Error fetching clients:", error?.response?.data?.message);
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
          { field: { Name: "company_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "website_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "industry_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "created_at_c" } }
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
        console.error(`Error fetching client with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(clientData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: clientData.Name || clientData.name,
            company_c: clientData.company_c || clientData.company,
            email_c: clientData.email_c || clientData.email,
            phone_c: clientData.phone_c || clientData.phone,
            website_c: clientData.website_c || clientData.website,
            address_c: clientData.address_c || clientData.address,
            industry_c: clientData.industry_c || clientData.industry,
            status_c: clientData.status_c || clientData.status || "Active",
            created_at_c: new Date().toISOString()
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
        console.error("Error creating client:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, clientData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: clientData.Name || clientData.name,
            company_c: clientData.company_c || clientData.company,
            email_c: clientData.email_c || clientData.email,
            phone_c: clientData.phone_c || clientData.phone,
            website_c: clientData.website_c || clientData.website,
            address_c: clientData.address_c || clientData.address,
            industry_c: clientData.industry_c || clientData.industry,
            status_c: clientData.status_c || clientData.status
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
        console.error("Error updating client:", error?.response?.data?.message);
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
        console.error("Error deleting client:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }
}

export default new ClientService();