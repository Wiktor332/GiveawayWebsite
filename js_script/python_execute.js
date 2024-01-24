function runPythonScript() {
    var pythonScriptPath = "python/api.py";

    subprocess.run(["python", pythonScriptPath]);
}

window.addEventListener('load', runPythonScript);