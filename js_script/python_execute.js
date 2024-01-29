function runPythonScript() {
    var pythonScriptPath = "./python/api.py";
    fetch(`http://localhost:3000/run-python?script=${pythonScriptPath}`)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(`Error executing Python script: ${error}`));
  }

  window.onload = function () {
    runPythonScript();
  };

  setInterval(() => {
    location.reload();
  }, 5000);