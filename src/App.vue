<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <div class="upload_file">
            <p>请选择专家名单（只支持.xlsx文件）：</p>
            <input ref="fileInput" type="file" accept=".xlsx" @change="loadFile" />
            <p v-if="fileLoaded">{{ fileLoadedMessage }}</p>
        </div>
    
        <div class="selection">
            <p>请选择要抽取专家数目：</p>
            <el-input-number v-model="selectedCount" :min="1"></el-input-number>
            <el-button type="primary" @click="selectPeople">抽签</el-button>
        </div>

        <p>被选中的专家为：</p>
        <el-table :data="selectedPeople" class="table">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="workplace" label="单位"></el-table-column>
            <el-table-column prop="phoneNumber" label="电话"></el-table-column>
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
            title: 'title',
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
        
        loadFile(event) {

            const file = event.target.files[0];
            if (file) {
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
                    this.fileLoadedMessage = `成功读取文件。总专家数: ${people.length}`;
                };

                reader.readAsArrayBuffer(file);
            }
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
.container {
    max-width: 1280px;
    margin: 2em 5em;
    background-color: aliceblue;
    padding: 2em 4em;
    font: 1.2em sans-serif;
  }
  
  h1 {
    padding: 2rem;
    text-align: center;
  }
  .upload_file {
    margin: 2em 0;
  }

  
  .selection {
    margin: 2em 0;
  }
  .table {
    padding: 5em auto;
  }

  .selection .el-button {
    margin: 0 2em;
  }
</style>
  