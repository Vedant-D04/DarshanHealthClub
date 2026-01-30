#!/usr/bin/env python3
"""
Script to embed CSS and JavaScript into HTML files for WordPress compatibility.
This creates standalone versions of each HTML page.
"""

import os
import re
from pathlib import Path

# Define paths
current_dir = Path(__file__).parent
css_file = current_dir / 'index.css'
js_file = current_dir / 'script.js'

# HTML files to process
html_files = [
    'index.html',
    'about.html',
    'contact.html',
    'facilities.html',
    'membership.html',
    'programs.html',
    'tips.html'
]

def read_file(filepath):
    """Read file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def embed_assets(html_content, css_content, js_content):
    """Embed CSS and JS into HTML"""
    
    # Remove external CSS link
    html_content = re.sub(
        r'<link\s+rel="stylesheet"\s+href="index\.css"[^>]*>',
        f'<style>\n{css_content}\n</style>',
        html_content
    )
    
    # Remove external JS script
    html_content = re.sub(
        r'<script\s+src="script\.js"[^>]*></script>',
        f'<script>\n{js_content}\n</script>',
        html_content
    )
    
    return html_content

def main():
    print("Starting asset embedding process...")
    
    # Read CSS and JS content
    print(f"Reading {css_file}...")
    css_content = read_file(css_file)
    
    print(f"Reading {js_file}...")
    js_content = read_file(js_file)
    
    # Create standalone directory if it doesn't exist
    standalone_dir = current_dir / 'standalone'
    standalone_dir.mkdir(exist_ok=True)
    print(f"Created/verified directory: {standalone_dir}")
    
    # Process each HTML file
    for html_file in html_files:
        print(f"\nProcessing {html_file}...")
        html_path = current_dir / html_file
        
        if not html_path.exists():
            print(f"  ⚠️  File not found, skipping: {html_file}")
            continue
        
        # Read HTML content
        html_content = read_file(html_path)
        
        # Embed CSS and JS
        standalone_content = embed_assets(html_content, css_content, js_content)
        
        # Write standalone version
        output_path = standalone_dir / html_file
        write_file(output_path, standalone_content)
        print(f"  ✓ Created standalone version: {output_path}")
    
    print("\n" + "="*60)
    print("✓ All files processed successfully!")
    print(f"✓ Standalone files are in: {standalone_dir}")
    print("="*60)
    print("\nYou can now copy the HTML from the 'standalone' folder")
    print("and paste directly into WordPress page editor (Code view).")

if __name__ == '__main__':
    main()
