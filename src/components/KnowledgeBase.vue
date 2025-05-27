<template>
  <div>
    <!-- 文件上传部分 -->
    <div>
      <h2>Upload File</h2>
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadFile">Upload</button>
      <p v-if="uploadMessage">{{ uploadMessage }}</p>
    </div>

    <!-- 查询部分 -->
    <div>
      <h2>Query Knowlege Base</h2>
      <input v-model="queryText" placeholder="Input query text" style="width: 500px;" />
      <button @click="queryKnowledge">Query</button>
      <div v-if="queryResult">
        <h3>Result：</h3>
        <pre style="word-break: break-all;white-space: pre-wrap;">{{ queryResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadDocument, queryKnowledge } from '../api';

export default {
  data() {
    return {
      file: null,
      uploadMessage: "",
      queryText: "",
      queryResult: null,
    };
  },
  methods: {
    // 处理文件选择
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    // 上传文件
    async uploadFile() {
      if (!this.file) {
        this.uploadMessage = "Please select file";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);

      try {
        const response = await uploadDocument(formData);
        if (response.ok) {
          this.uploadMessage = "Scuccessfully uploaded";
        } else {
          this.uploadMessage = "upload failed";
        }
      } catch (error) {
        this.uploadMessage = "error when upload";
        console.error("error when upload：", error);
      }
    },
    // 查询知识库
    async queryKnowledge() {
      if (!this.queryText) {
        this.queryResult = "Please input query text";
        return;
      }

      try {
        const response = await queryKnowledge({ text: this.queryText });
        if (response.ok) {
          const data = await response.json();
          this.queryResult = JSON.stringify(data, null, 2);
        } else {
          this.queryResult = "query failed";
        }
      } catch (error) {
        this.queryResult = "query error";
        console.error("query error：", error);
      }
    },
  },
};
</script>

<style scoped>
div {
  margin-bottom: 20px;
}
input {
  margin-right: 10px;
}
pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
</style>