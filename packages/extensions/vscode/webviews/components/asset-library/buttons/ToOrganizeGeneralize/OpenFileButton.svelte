<script>
  import { openFilesData } from '../../../../stores/fileMgmt/openStore';

  function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          openFilesData.update(currentFiles => {
            if (!Array.isArray(currentFiles)) {
              currentFiles = [];
            }
            return [
              ...currentFiles,
              { name: file.name, content: e.target.result }
            ];
          });
        };
        reader.readAsText(file);
      });
    }
  }
</script>

<div>
  <input type="file" multiple on:change={handleFileUpload} />
</div>