<template>
  <div id="upload" class="page">
    <div class="toolbar">
      <div class="center">SnapBox Uploader</div>
    </div>
    <form
      v-if="!isSaving"
      id="file-form"
      class="margin-5"
      enctype="multipart/form-data"
      novalidate
      @change="checkFormValid"
    >
      <ul>
        <li>
          <img id="image-preview" :src="imagePath" />
          <input id="file-input" type="file" :disabled="isSaving" accept="image/*" @change="onFileChange" />
          <label id="file-label" class="button--large button--outline button" for="file-input">
            <div icon="fa-image"></div> Choose Picture
          </label>
        </li>
        <li>
          <div class="left">
            <div icon="fa-chair"></div>&nbsp; Table
          </div>
          <select v-model="selectedTable" class="select">
            <option v-for="table in tables" :key="table.value" :value="table.value">
              {{ table.text }}
            </option>
          </select>
        </li>
        <li>
          <div class="left">
            <div icon="fa-user-edit"></div>&nbsp; Name
          </div>
          <select v-model="selectedName" class="select">
            <option v-for="name in names" :key="name.value" :value="name.value">
              {{ name.text }}
            </option>
          </select>
        </li>
        <li>
          <button id="button-form" modifier="large" :disabled="formValid === false" @click="onSave">
            Upload Picture
          </button>
        </li>
      </ul>
    </form>
    <div v-if="isSaving">
      <p style="text-align: center">Waiting Upload</p>
      <p style="text-align: center">loading bar</p>
    </div>
  </div>
</template>

<script lang="ts">
import data from "@/data";
import SnapboxService from "@/services/snapbox.service";
import pathParse from "path-parse";
import { defineComponent, ref, watch } from "vue";
import default_picture from "@/assets/picture.png";

export default defineComponent({
  name: "Upload",
  setup() {
    const errors = ref([]);
    const formValid = ref(false);
    const isSaving = ref(false);
    const picture = ref(null);
    const selectedTable = ref("honneur");
    const tables = data.tables;
    const names = ref(data.names.honneur);
    const selectedName = ref(data.names.honneur[1].value);
    const imagePath = ref(default_picture);

    function onSave(event: any): void {
      console.log(event);
      if (picture.value && selectedName && selectedTable) {
        let file_parse = pathParse(picture.value.name);
        let now = Date.now();
        let filename = `${now}-${selectedTable.value}-${selectedName.value}-${file_parse.name}${file_parse.ext}`;
        let url_filename = encodeURI(filename);

        console.log(picture.value.type);
        SnapboxService.uploadPicture(
          url_filename,
          picture.value,
          picture.value.type
        )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        selectedTable.value = "honneur";
        selectedName.value = data.names.honneur[1].value;
        picture.value = null;
        imagePath.value = "img/picture.png";
        isSaving.value = false;
        return;
      }
      errors.value = [];
      if (!selectedName.value) errors.value.push("Name required.");
      if (!picture.value) errors.value.push("Picture required.");
      isSaving.value = false;
    }

    watch(selectedTable, (value: string) => {
      const newNames = data.names[value];
      names.value = newNames;
      selectedName.value = newNames[0].value;
    })

    function onFileChange(event: any): void {
      picture.value = event.target.files[0] || event.dataTransfer.files[0];
      imagePath.value = URL.createObjectURL(picture.value);
    }

    function checkFormValid(): void {
      if (picture.value && selectedTable.value && selectedName.value)
        formValid.value = true;
      else formValid.value = false;
    }

    return {
      onSave,
      onFileChange,
      checkFormValid,
      isSaving,
      imagePath,
      selectedTable,
      tables,
      selectedName,
      names,
      formValid,
    };
  },
});
</script>

<style>
.margin-5 {
  margin: 5px;
}

.select {
  width: 100%;
}

#file-input {
  display: none;
}

#image-preview {
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  margin-bottom: 10px;
}

ons-input {
  width: 100% !important;
}
</style>
