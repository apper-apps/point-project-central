class ChatService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    this.getApperClient = () => {
      const { ApperClient } = window.ApperSDK;
      return new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    };
    this.chatMessageTableName = 'chat_message_c';
    this.channelTableName = 'channel_c';
  }

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "content_c" } },
          { field: { Name: "channel_type_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "parent_id_c" } },
          { field: { Name: "author_id_c" } },
          { field: { Name: "project_id_c" } }
        ],
        orderBy: [{ fieldName: "created_at_c", sorttype: "ASC" }]
      };
      
      const response = await apperClient.fetchRecords(this.chatMessageTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching chat messages:", error?.response?.data?.message);
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
          { field: { Name: "content_c" } },
          { field: { Name: "channel_type_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "parent_id_c" } },
          { field: { Name: "author_id_c" } },
          { field: { Name: "project_id_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById(this.chatMessageTableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching chat message with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getChannelsByType(channelType = 'team') {
    try {
      const apperClient = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type_c" } },
          { field: { Name: "project_id_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "member_count_c" } },
          { field: { Name: "description_c" } }
        ],
        where: [
          {
            FieldName: "type_c",
            Operator: "EqualTo",
            Values: [channelType]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords(this.channelTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching channels by type:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getMessagesByChannel(projectId = null, channelType = 'team') {
    try {
      const apperClient = this.getApperClient();
      const whereConditions = [
        {
          FieldName: "channel_type_c",
          Operator: "EqualTo",
          Values: [channelType]
        }
      ];
      
      if (channelType === 'project' && projectId) {
        whereConditions.push({
          FieldName: "project_id_c",
          Operator: "EqualTo",
          Values: [parseInt(projectId)]
        });
      }
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "content_c" } },
          { field: { Name: "channel_type_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "updated_at_c" } },
          { field: { Name: "parent_id_c" } },
          { field: { Name: "author_id_c" } },
          { field: { Name: "project_id_c" } }
        ],
        where: whereConditions,
        orderBy: [{ fieldName: "created_at_c", sorttype: "ASC" }]
      };
      
      const response = await apperClient.fetchRecords(this.chatMessageTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching messages by channel:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async create(messageData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: messageData.Name || messageData.name || `Message - ${new Date().toLocaleString()}`,
            content_c: messageData.content_c || messageData.content,
            channel_type_c: messageData.channel_type_c || messageData.channelType || 'team',
            created_at_c: new Date().toISOString(),
            updated_at_c: new Date().toISOString(),
            parent_id_c: messageData.parent_id_c || messageData.parentId || null,
            author_id_c: messageData.author_id_c ? parseInt(messageData.author_id_c) : (messageData.authorId ? parseInt(messageData.authorId) : null),
            project_id_c: messageData.project_id_c ? parseInt(messageData.project_id_c) : (messageData.projectId ? parseInt(messageData.projectId) : null)
          }
        ]
      };
      
      const response = await apperClient.createRecord(this.chatMessageTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.results?.[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating chat message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async update(id, messageData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: messageData.Name || messageData.name,
            content_c: messageData.content_c || messageData.content,
            updated_at_c: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.updateRecord(this.chatMessageTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.results?.[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating chat message:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord(this.chatMessageTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting chat message:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return false;
    }
  }

  async createChannel(channelData) {
    try {
      const apperClient = this.getApperClient();
      const params = {
        records: [
          {
            Name: channelData.Name || channelData.name,
            type_c: channelData.type_c || channelData.type || 'team',
            project_id_c: channelData.project_id_c ? parseInt(channelData.project_id_c) : (channelData.projectId ? parseInt(channelData.projectId) : null),
            created_at_c: new Date().toISOString(),
            member_count_c: channelData.member_count_c || channelData.memberCount || 1,
            description_c: channelData.description_c || channelData.description || ''
          }
        ]
      };
      
      const response = await apperClient.createRecord(this.channelTableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.results?.[0]?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating channel:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }
  
  // Utility methods for backward compatibility
  async getThreadReplies(parentId) {
    return this.getMessagesByChannel(null, 'thread', parentId);
  }
  
  async addMemberToChannel(channelId, memberId) {
    // This would require custom logic for channel membership
    return true;
  }
  
  extractMentions(content) {
    const mentionRegex = /@([a-zA-Z0-9._-]+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  }
  
  async searchMessages(query, channelType = 'team', projectId = null) {
    const messages = await this.getMessagesByChannel(projectId, channelType);
    return messages.filter(message => 
      message.content_c?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default new ChatService();