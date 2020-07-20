<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    open-on-click
    hoverable
    dense
    expand-icon="mdi-chevron-down"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon size="19px" v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else size="19px">
        {{ files[item.file] }}
      </v-icon>
    </template>
    <template v-slot:label="{item}">
      <div class="label">
      {{item.name }}
    </div>
    </template>

  </v-treeview>
</template>

<script>
  export default {
    data: () => ({
      open: ['week2'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        py: 'fab fa-python'
      },
      tree: [],
      items: [
        {
          name: 'week1',
          children: [{
              name: '수업자료1.pdf',
              file: 'pdf',
            },
            {
              name: 'prob1.py',
              file: 'py',
            },
            {
              name: 'prob2.py',
              file: 'py',
            },
          ],
        },
        {
          name: 'week2',
          children: [{
              name: '수업자료2.pdf',
              file: 'pdf',
            },
            {
              name: 'prob1.py',
              file: 'py',
            },
            {
              name: 'prob2.py',
              file: 'py',
            },
          ],
        },
      ],
    }),
  }
</script>

<style scoped>
.label {
  font-size: 13px;
}
</style>
