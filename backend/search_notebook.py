import json

with open(r"C:\DEV\RainCast-ai\BTP-notebook.ipynb", "r", encoding="utf-8") as f:
    notebook = json.load(f)

with open("notebook_features.txt", "w", encoding="utf-8") as out:
    for cell in notebook.get("cells", []):
        if cell.get("cell_type") == "code":
            source = "".join(cell.get("source", []))
            if "roll3_mean" in source or "lag_" in source:
                out.write("FOUND FEATURE ENG in cell:\n")
                out.write(source)
                out.write("\n" + "-" * 80 + "\n")
