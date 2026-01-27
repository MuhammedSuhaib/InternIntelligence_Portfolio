import os
import glob

def generate_architecture_docs():
    """Generate architecture documentation for the frontend."""

    # Define paths - we're running from the full-stack-todo directory
    frontend_path = os.path.join(os.getcwd(), "")
    output_file = os.path.join(frontend_path, "FRONTEND_ARCHITECTURE.md")

    # Start the markdown file with UTF-8 encoding
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("## Directory Structure\n")
        f.write("```\n")

        # Write directory listing
        f.write(f" Directory of {frontend_path}\n\n")

        # Get all items in the frontend directory
        all_items = os.listdir(frontend_path)
        directories = []
        files = []

        for item in all_items:
            item_path = os.path.join(frontend_path, item)
            if os.path.isdir(item_path):
                directories.append(item)
            else:
                # Only include non-md files
                if not item.lower().endswith('.md'):
                    files.append(item)

        # Write directories first
        for directory in sorted(directories):
            f.write(f"{directory}/\n")

        # Then write files
        for file in sorted(files):
            f.write(f"{file}\n")

        f.write("```\n\n")

        # Find all relevant frontend files (TS, TSX, JS, JSX, JSON, etc.) in the frontend directory recursively
        file_patterns = ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json", "**/*.css", "**/*.scss"]

        for pattern in file_patterns:
            matched_files = glob.glob(os.path.join(frontend_path, pattern), recursive=True)

            # Write content of each file
            for file_path in sorted(matched_files):
                # Get relative path for the header
                rel_path = os.path.relpath(file_path, frontend_path)

                # Skip node_modules and build directories
                if "node_modules" not in file_path and ".next" not in file_path and "__pycache__" not in file_path:
                    # Determine file extension for syntax highlighting
                    ext = os.path.splitext(file_path)[1].lower()
                    lang_map = {
                        '.ts': 'typescript',
                        '.tsx': 'tsx',
                        '.js': 'javascript',
                        '.jsx': 'jsx',
                        '.json': 'json',
                        '.css': 'css',
                        '.scss': 'scss'
                    }

                    language = lang_map.get(ext, 'text')  # Default to 'text' if extension not in map

                    f.write(f"# {rel_path}\n")
                    f.write(f"```{language}\n")

                    try:
                        # Read the file with UTF-8 encoding
                        with open(file_path, 'r', encoding='utf-8') as source_file:
                            content = source_file.read()
                            f.write(content)
                    except Exception as e:
                        f.write(f"# Error reading file: {str(e)}\n")

                    f.write("\n```\n\n")

    print("Frontend architecture documentation generated successfully in FRONTEND_ARCHITECTURE.md")

if __name__ == "__main__":
    generate_architecture_docs()