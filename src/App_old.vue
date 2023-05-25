<template>
  <div class="container">
      <h1>{{ title }}</h1>
          <div>
              <input ref="fileInput" type="file" accept=".xlsx" />
          </div>

      <el-button type="primary" @click="loadFile">读取文件</el-button>
      <p v-if="fileLoaded">{{ fileLoadedMessage }}</p>
      <div class="selection">
          <el-input-number v-model="selectedCount" :min="1"
              placeholder="Number of People"></el-input-number>
          <el-button type="primary" @click="selectPeople">Select</el-button>
      </div>
      <el-table :data="selectedPeople">
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="workplace" label="Workplace"></el-table-column>
          <el-table-column prop="phoneNumber" label="Phone Number"></el-table-column>
      </el-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElInput, ElButton, ElInputNumber, ElTable, ElTableColumn } from 'element-plus';
import * as XLSX from 'xlsx';

export default defineComponent({
  components: {
      ElInput,
      ElButton,
      ElInputNumber,
      ElTable,
      ElTableColumn,
  },
  data() {
      return {
          title: '西昌市教育和体育局专家抽取系统',
          filePath: '@/assets/data/name_list.xlsx', // Path to the Excel file
          isEditing: false,
          fileLoaded: false,
          fileLoadedMessage: '',
          selectedCount: 0,
          people: [], // Array to store all people from the file
          selectedPeople: [], // Array to store selected people
      };
  },
  methods: {
      //   loadFile() {
      //     const file = this.filePath;
      //     const reader = new FileReader();
      //     reader.onload = (e) => {
      //       const data = new Uint8Array(e.target.result);
      //       const workbook = XLSX.read(data, { type: 'array' });
      //       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      //       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      //       const headers = jsonData[0];
      //       const rows = jsonData.slice(1);

      //       const people = rows.map((row) => {
      //         return {
      //           name: row[0],
      //           workplace: row[1],
      //           phoneNumber: row[2],
      //         };
      //       });

      //       this.people = people;
      //       this.fileLoaded = true;
      //       this.fileLoadedMessage = `File loaded successfully. Total people: ${people.length}`;
      //     };
      //     reader.readAsArrayBuffer(file);
      //   },
      loadFile() {
          const file = this.$refs.fileInput.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: 'array' });
              const worksheet = workbook.Sheets[workbook.SheetNames[0]];
              const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              const headers = jsonData[0];
              const rows = jsonData.slice(1);

              const people = rows.map((row) => {
                  return {
                      name: row[0],
                      workplace: row[1],
                      phoneNumber: row[2],
                  };
              });

              this.people = people;
              this.fileLoaded = true;
              this.fileLoadedMessage = `File loaded successfully. Total people: ${people.length}`;
          };

          reader.readAsArrayBuffer(file);
      },
      shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
return array;
},

      selectPeople() {
          const count = parseInt(this.selectedCount);
          const shuffledPeople = this.shuffleArray([...this.people]);
          const selectedPeople = shuffledPeople.slice(0, count);

          this.selectedPeople = selectedPeople;
          console.log(this.selectedCount, count, shuffledPeople, this.selectedPeople);
      },
  },


});



</script>

<style>
/* .container {
  margin: 20px;
}

.file-path {
  cursor: pointer;
}

.selection {
  margin-top: 20px;
} */

</style>
